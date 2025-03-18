from flask import Blueprint, render_template

languages_bp = Blueprint('languages', __name__)

@languages_bp.route('/python')
def python():
    return render_template('languages/python/index.html')

@languages_bp.route('/C')
def C():
    return render_template('languages/C/index.html')

@languages_bp.route('/Cpp')
def Cpp():
    return render_template('languages/CPP/index.html')

@languages_bp.route('/HTML')
def HTML():
    return render_template('languages/HTML/index.html')

@languages_bp.route('/CSS')
def CSS():
    return render_template('languages/CSS/index.html')

@languages_bp.route('/<language>/<topic>')
def load_topic(language, topic):
    try:
        return render_template(f"languages/{language}/{topic}.html")
    except:
        return "Page not found", 404
    
    
    

