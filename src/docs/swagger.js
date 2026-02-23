import swaggerJSDoc from "swagger-jsdoc";

const definition = {
    openapi: "3.0.3",
    info: {
        title: "Glamour Backend API",
        version: "1.0.0",
        description: "Documentacion de endpoints del backend de Glamour"
    },
    servers: [
        {
            url: "http://localhost:3000",
            description: "Local"
        }
    ],
    tags: [
        { name: "Users", description: "Usuarios y autenticacion" },
        { name: "Products", description: "Gestion de productos" },
        { name: "Categories", description: "Gestion de categorias" },
        { name: "Suppliers", description: "Gestion de proveedores" }
    ],
    components: {
        schemas: {
            ErrorResponse: {
                type: "object",
                properties: {
                    message: { type: "string", example: "Error interno del servidor" }
                }
            },
            User: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "67bcabcd1234abcd1234abcd" },
                    email: { type: "string", format: "email", example: "user@mail.com" },
                    role: { type: "string", example: "client" },
                    created_at: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                }
            },
            UserInput: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", format: "email", example: "user@mail.com" },
                    password: { type: "string", example: "123456" },
                    role: { type: "string", example: "client" }
                }
            },
            LoginInput: {
                type: "object",
                required: ["email", "password"],
                properties: {
                    email: { type: "string", format: "email", example: "user@mail.com" },
                    password: { type: "string", example: "123456" }
                }
            },
            Category: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "67bcabcd1234abcd1234ab01" },
                    name: { type: "string", example: "Perfumes" },
                    description: { type: "string", example: "Fragancias para uso diario" },
                    image: { type: "string", example: "/img/categories/perfumes.jpg" }
                }
            },
            CategoryInput: {
                type: "object",
                required: ["name", "description", "image"],
                properties: {
                    name: { type: "string", example: "Perfumes" },
                    description: { type: "string", example: "Fragancias para uso diario" },
                    image: { type: "string", example: "/img/categories/perfumes.jpg" }
                }
            },
            Supplier: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "67bcabcd1234abcd1234ab02" },
                    name: { type: "string", example: "Distribuidora Norte" },
                    contact: { type: "string", example: "Juan Perez" },
                    email: { type: "string", format: "email", example: "proveedor@mail.com" },
                    phone: { type: "string", example: "+54 11 5555 5555" },
                    address: { type: "string", example: "Calle 123" },
                    created_at: { type: "string", format: "date-time" }
                }
            },
            SupplierInput: {
                type: "object",
                required: ["name", "contact", "email", "phone", "address"],
                properties: {
                    name: { type: "string", example: "Distribuidora Norte" },
                    contact: { type: "string", example: "Juan Perez" },
                    email: { type: "string", format: "email", example: "proveedor@mail.com" },
                    phone: { type: "string", example: "+54 11 5555 5555" },
                    address: { type: "string", example: "Calle 123" }
                }
            },
            Product: {
                type: "object",
                properties: {
                    _id: { type: "string", example: "67bcabcd1234abcd1234ab03" },
                    title: { type: "string", example: "Perfume Floral" },
                    description: { type: "string", example: "Fragancia floral de larga duracion" },
                    price: { type: "number", example: 12000 },
                    code: { type: "string", example: "PRF-001" },
                    stock: { type: "integer", example: 50 },
                    category_id: { type: "string", example: "67bcabcd1234abcd1234ab01" },
                    supplier_id: { type: "string", example: "67bcabcd1234abcd1234ab02" },
                    status: { type: "boolean", example: true },
                    thumbnail: { type: "string", example: "/img/products/perfume.jpg" }
                }
            },
            ProductInput: {
                type: "object",
                required: ["title", "description", "price", "stock"],
                properties: {
                    title: { type: "string", example: "Perfume Floral" },
                    description: { type: "string", example: "Fragancia floral de larga duracion" },
                    price: { type: "number", example: 12000 },
                    code: { type: "string", example: "PRF-001" },
                    stock: { type: "integer", example: 50 },
                    category_id: { type: "string", example: "67bcabcd1234abcd1234ab01" },
                    supplier_id: { type: "string", example: "67bcabcd1234abcd1234ab02" },
                    status: { type: "boolean", example: true },
                    file: { type: "string", format: "binary" }
                }
            }
        }
    },
    paths: {
        "/api/users/allusers": {
            get: {
                tags: ["Users"],
                summary: "Obtener todos los usuarios",
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/users/{id}": {
            get: {
                tags: ["Users"],
                summary: "Obtener usuario por ID",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/users/email/{email}": {
            get: {
                tags: ["Users"],
                summary: "Obtener usuario por email",
                parameters: [
                    { name: "email", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/users/register": {
            post: {
                tags: ["Users"],
                summary: "Registrar usuario",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/UserInput" } }
                    }
                },
                responses: {
                    "201": { description: "Creado" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/users/login": {
            post: {
                tags: ["Users"],
                summary: "Login de usuario",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/LoginInput" } }
                    }
                },
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/users/update/{id}": {
            put: {
                tags: ["Users"],
                summary: "Actualizar usuario",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/UserInput" } }
                    }
                },
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/users/delete/{id}": {
            delete: {
                tags: ["Users"],
                summary: "Eliminar usuario",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/products/all": {
            get: {
                tags: ["Products"],
                summary: "Listar productos con paginacion y filtros",
                parameters: [
                    { name: "limit", in: "query", schema: { type: "integer", default: 10 } },
                    { name: "page", in: "query", schema: { type: "integer", default: 1 } },
                    { name: "sort", in: "query", schema: { type: "string", enum: ["asc", "desc"] } },
                    { name: "category", in: "query", schema: { type: "string" } },
                    { name: "minPrice", in: "query", schema: { type: "number" } },
                    { name: "maxPrice", in: "query", schema: { type: "number" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/products/new-arrivals": {
            get: {
                tags: ["Products"],
                summary: "Obtener productos nuevos",
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/products/search": {
            get: {
                tags: ["Products"],
                summary: "Buscar productos",
                parameters: [
                    { name: "q", in: "query", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/products/{id}": {
            get: {
                tags: ["Products"],
                summary: "Obtener producto por ID",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            },
            put: {
                tags: ["Products"],
                summary: "Actualizar producto",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: { $ref: "#/components/schemas/ProductInput" }
                        }
                    }
                },
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            },
            delete: {
                tags: ["Products"],
                summary: "Eliminar producto fisicamente",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/products/category/{category}": {
            get: {
                tags: ["Products"],
                summary: "Obtener productos por categoria",
                parameters: [
                    { name: "category", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/products/create": {
            post: {
                tags: ["Products"],
                summary: "Crear producto",
                requestBody: {
                    required: true,
                    content: {
                        "multipart/form-data": {
                            schema: { $ref: "#/components/schemas/ProductInput" }
                        }
                    }
                },
                responses: {
                    "201": { description: "Creado" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/products/insertMany": {
            post: {
                tags: ["Products"],
                summary: "Crear multiples productos",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/ProductInput" }
                            }
                        }
                    }
                },
                responses: {
                    "201": { description: "Creado" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/products/delete/{id}": {
            put: {
                tags: ["Products"],
                summary: "Baja logica de producto",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/categories": {
            get: {
                tags: ["Categories"],
                summary: "Obtener todas las categorias",
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/categories/{id}": {
            get: {
                tags: ["Categories"],
                summary: "Obtener categoria por ID",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/categories/create": {
            post: {
                tags: ["Categories"],
                summary: "Crear categoria",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/CategoryInput" } }
                    }
                },
                responses: {
                    "201": { description: "Creado" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/categories/update/{id}": {
            put: {
                tags: ["Categories"],
                summary: "Actualizar categoria",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/CategoryInput" } }
                    }
                },
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/categories/delete/{id}": {
            delete: {
                tags: ["Categories"],
                summary: "Eliminar categoria",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/suppliers": {
            get: {
                tags: ["Suppliers"],
                summary: "Obtener todos los proveedores",
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/suppliers/{id}": {
            get: {
                tags: ["Suppliers"],
                summary: "Obtener proveedor por ID",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/suppliers/insertMany": {
            post: {
                tags: ["Suppliers"],
                summary: "Crear multiples proveedores",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "array",
                                items: { $ref: "#/components/schemas/SupplierInput" }
                            }
                        }
                    }
                },
                responses: {
                    "201": { description: "Creado" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/suppliers/create": {
            post: {
                tags: ["Suppliers"],
                summary: "Crear proveedor",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/SupplierInput" } }
                    }
                },
                responses: {
                    "201": { description: "Creado" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/suppliers/update/{id}": {
            put: {
                tags: ["Suppliers"],
                summary: "Actualizar proveedor",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": { schema: { $ref: "#/components/schemas/SupplierInput" } }
                    }
                },
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        },
        "/api/suppliers/delete/{id}": {
            delete: {
                tags: ["Suppliers"],
                summary: "Eliminar proveedor",
                parameters: [
                    { name: "id", in: "path", required: true, schema: { type: "string" } }
                ],
                responses: {
                    "200": { description: "OK" },
                    "500": {
                        description: "Error",
                        content: { "application/json": { schema: { $ref: "#/components/schemas/ErrorResponse" } } }
                    }
                }
            }
        }
    }
};

export const swaggerSpec = swaggerJSDoc({ definition, apis: [] });
