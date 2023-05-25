FRONTEND - MIDDLE-END   - BACKEND

-   We need an intermediate layer between the client side and the microservice
-   Using the middle-end , when the client sends the request we will be able to make decisions that which microservice should
    actually respond to this request.
-   We can do message validation, response transformation, rate limiting
-   We try to prepare an API gateway that acts as this middle-end.