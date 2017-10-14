const PROXY_CONFIG = [
    {
        context: [
            "/users",
            "/products",
            "/orders"
        ],
        target: "http://localhost:3000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
