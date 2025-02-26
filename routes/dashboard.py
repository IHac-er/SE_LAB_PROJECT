from flask import *

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/dashboard')
def dashboard():
    if 'name' in session and 'email' in session:
        return render_template('dashboard/dashboard.html', name=session['name'], email=session['email'])
    return redirect('/login')  

@dashboard_bp.route('/view-profile')
def viewprofile():
    if 'name' in session and 'email' in session:
        return render_template('dashboard/viewprofile.html', name=session['name'], email=session['email'])
    return redirect('/dashboard')  