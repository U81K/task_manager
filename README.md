# My React Native App with Django GraphQL Backend

## Prerequisites

- Node.js (for React Native)
- Python (for Django)
- Expo CLI (if using Expo)

## Setup Instructions

### 1. Clone the Repository


#for the backend

cd core

python -m venv venv
source venv/bin/activate


pip install -r requirements.txt

python manage.py runserver

for frontend

cd frontend/

npm install

Update the GraphQL endpoint in src/apolloClient.js

npx expo start




# to register a user 
# mutation {
#   registerUser(
#     username: "newuser",
#     password: "securepassword123"
#   ) {
#     user {
#       id
#       username
#     }
#     success
#     errors
#   }
# }

# to login
# mutation {
#   tokenAuth(username: "newuser", password: "securepassword123") {
#     token
#   }
# }

# to logout 
# clear the JWT token from storage in the front end

# to create a task 
# mutation {
#   createTask(title:"task2", description:"fdasklfjlkdasjf"){
#     task {
#       id
    #   title
    #   description
    #   completed
    #   dueDate
    #   user {
    #     username
    #   }
  #   }
  # }
  # }

#delete a task 
#   mutation {
#   deleteTask(id: 2) {
#     success
#     message
#   }
# }

# query {
#   me {
#     id
#     username
#     email
#   }
# }


