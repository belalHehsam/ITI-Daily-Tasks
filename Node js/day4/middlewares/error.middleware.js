const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "CastError") {
        message = "Invalid ID";
        statusCode = 400;
    }

    if (err.name === "ValidationError") {
        message = Object.values(err.errors)
            .map(e => e.message)
            .join(", ");
        statusCode = 400;
    }

    if (err.code === 11000) {
        message = "Duplicate field value";
        statusCode = 400;
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;



// error from ValidationError

// {
//   name: "ValidationError",
//   message: "User validation failed",
//   errors: {
//     name: {
//       message: "Path `name` is required.",
//       kind: "required",
//       path: "name",
//       value: undefined
//     },
//     age: {
//       message: "Age must be a number",
//       kind: "Number",
//       path: "age",
//       value: "abc"
//     }
//   }
// }