from flask import Flask, render_template, request, redirect, session

from routes.languages import languages_bp
from routes.auth import auth_bp
from routes.dashboard import dashboard_bp
from routes.admin import admin_bp
from routes.games import games_bp

app = Flask(__name__)
app.secret_key = "codeodessey"  # Required for session management

app.register_blueprint(languages_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(dashboard_bp)
app.register_blueprint(admin_bp)
app.register_blueprint(games_bp)

@app.route('/')
def homepage():
    return render_template('homepage.html')

@app.route('/404')
def ER404():
    return render_template('404.html')

@app.route('/about')
def about():
    return render_template('homepage-links/about.html')

@app.route('/help')
def help():
    return render_template('homepage-links/help.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
