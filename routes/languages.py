from flask import Blueprint, render_template

languages_bp = Blueprint('languages', __name__)

@languages_bp.route('/python')
def python():
    return render_template('languages/python.html')

@languages_bp.route('/C')
def C():
    return render_template('languages/C.html')

@languages_bp.route('/Cpp')
def Cpp():
    return render_template('languages/Cpp.html')

@languages_bp.route('/HTML')
def HTML():
    return render_template('languages/HTML.html')

@languages_bp.route('/CSS')
def CSS():
    return render_template('languages/CSS.html')
