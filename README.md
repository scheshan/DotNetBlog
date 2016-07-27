# DotNetBlog
A Tiny Blog Written in Asp.Net Core

How to Build and Run:

*   Clone the repository
*   Restore the dependencies

    ```
    dotnet restore
    ```
*   Build admin portal

    ```
    cd src/DotNetBlog.Admin
	npm install
    webpack
    ```
*   Install front-end client libraries

    ```
    cd src/DotNetBlog.Web
	bower install
    ```
*   Edit connection string
	Open 'src/DotNetBlog.Web/App_Data/config.json' to specify you own connection string.

    ```
    {
        "database": "sqlite",
        "connectionString": "DataSource=App_Data/blog.db"
        //"database": "sqlserver",
        //"connectionString": "server=.\\SqlServer2008;database=DotNetBlog;uid=sa;pwd=123456;"
    }
    ```

    DotNetBlog supports two kinds of database. You can set "database" to "sqite" or "sqlserver"
*   Run the project

    ```
    dotnet run
    ```
*   Initialize blog
    You can access 'http://{your blog address}/install' to initialize the blog, this will help to create a default admin user, which username and password are both 'admin'.

The project is still in DEVELOPMENT!