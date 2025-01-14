import graphene
from graphene_django import DjangoObjectType
from .models import Task
from django.contrib.auth.models import User
from graphql_jwt.decorators import login_required
from graphql_jwt import mutations as jwt_mutations
from django.contrib.auth import get_user_model

User = get_user_model()

class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ('id', 'user', 'title', 'description', 'completed', 'due_date')

class Query(graphene.ObjectType):
	tasks = graphene.List(TaskType)
	task = graphene.Field(TaskType, id=graphene.ID())
	me = graphene.Field(UserType)
 
	@login_required
	def resolve_tasks(self, info):
		return Task.objects.filter(user=info.context.user)

	@login_required
	def resolve_task(self, info, id):
		return Task.objects.get(pk=id)

	@login_required
	def resolve_me(self, info):
		return info.context.user

class RegisterUserMutation(graphene.Mutation):
    class Arguments:
        username = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserType)
    success = graphene.Boolean()
    errors = graphene.List(graphene.String)

    def mutate(self, info, username, password):
        errors = []

        # Check if username already exists
        if User.objects.filter(username=username).exists():
            errors.append("Username already exists.")

		# Validate password
        if not password or len(password.strip()) == 0:
            errors.append("Password cannot be empty.")
        elif len(password) < 8:
            errors.append("Password must be at least 8 characters long.")
        
        if errors:
            raise Exception(errors)

        # Create a new user
        user = User.objects.create_user(
            username=username,
            password=password,
        )
        return RegisterUserMutation(user=user, success=True, errors=errors)

class CreateTaskMutation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        description = graphene.String(required=True)
        completed = graphene.Boolean()
        due_date = graphene.Date()

    task = graphene.Field(TaskType)

    @login_required
    def mutate(self, info, **kwargs):
        user = info.context.user
        task = Task.objects.create(
            user=user,
            title=kwargs.get('title'),
            description=kwargs.get('description'),
            completed=kwargs.get('completed', False),  # Default to False if not provided
            due_date=kwargs.get('due_date'),
            )
        return CreateTaskMutation(task=task)

class DeleteTaskMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)  # Task ID to delete

    success = graphene.Boolean()
    message = graphene.String()

    @login_required
    def mutate(self, info, id):
        user = info.context.user  # Get the authenticated user

        try:
            task = Task.objects.get(id=id, user=user)  # Ensure the task belongs to the user
            task.delete()
            return DeleteTaskMutation(success=True, message="Task deleted successfully.")
        except Task.DoesNotExist:
            return DeleteTaskMutation(success=False, message="Task not found or you do not have permission to delete it.")


class Mutation(graphene.ObjectType):

    token_auth = jwt_mutations.ObtainJSONWebToken.Field()
    verify_token = jwt_mutations.Verify.Field()
    refresh_token = jwt_mutations.Refresh.Field()
    revoke_token = jwt_mutations.Revoke.Field()

    create_task = CreateTaskMutation.Field()
    delete_task = DeleteTaskMutation.Field()
    
    register_user = RegisterUserMutation.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)