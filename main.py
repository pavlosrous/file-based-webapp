from website import create_app

app = create_app()


# only if we run this file (not import it) we are going to run the webserver
if __name__ == '__main__':
    app.run(debug=True) #rerun the server when we make a change


