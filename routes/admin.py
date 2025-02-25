from flask import *

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/admin_login')
def admin_login():
    if 'name' in session and 'email' in session:
        return render_template('admin/admin.html', name=session['name'], email=session['email'])
    return redirect('/login')  