const PROXY_CONFIG = [
    {
        context: [
            "/users",
            "/products"
        ],
        target: "http://localhost:3000",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
