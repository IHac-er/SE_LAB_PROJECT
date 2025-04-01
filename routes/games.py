import os
import subprocess
import traceback
from flask import *
import sys 

games_bp = Blueprint("games", __name__)

@games_bp.route('/py-hangman')
def open_py_hangman():
    if 'email' in session:
        return render_template('games/python/hangman_py.html') 
    return render_template('/dashboard')

@games_bp.route('/cssgame1')
def open_cssgame1():
    if 'email' in session:
        return render_template('games/CSS/cssgame1.html')
    return render_template('/dashboard')

@games_bp.route('/puzzle-c-game')
def open_c_puzzle():
    if 'email' in session: 
        return render_template('games/C/c_puzzle.html')
    return render_template('/dashboard')

@games_bp.route('/debugger-c-game')
def open_c_debug():
    if 'email' in session:
        return render_template('games/C/c_debugger.html')
    return render_template('/dashboard')

@games_bp.route('/debugger-cpp-game')
def open_cpp_debug():
    if 'email' in session:
        return render_template('games/CPP/cpp_debugger.html')
    return render_template('/dashboard')

@games_bp.route('/ninja-boy-game')
def open_ninja_boy():
    if 'email' in session:
        return render_template('games/HTML/ninja_boy.html')
    return render_template('/dashboard')

@games_bp.route('/car-game')
def open_car_game():
    if 'email' in session:
        return render_template('games/CPP/car_game.html')
    return render_template('/dashboard')

@games_bp.route('/html_game2')
def open_html2_game():
    if 'email' in session:
        return render_template('games/HTML/html_game2.html')
    return render_template('/dashabord')

@games_bp.route('/cssgame2')
def open_cssgame2():
    if 'email' in session:
        return render_template('games/CSS/cssgame2.html')
    return render_template('/dashboard')

@games_bp.route("/execute-hangman", methods=["POST"])
def execute_hangman():
    data = request.json
    user_code = data.get("code", "").strip()
    test_input = data.get("test_input", "").strip()

    if not user_code:
        return jsonify({"output": "Error: No code provided"})

    # Restrict certain keywords to prevent dangerous operations
    forbidden_keywords = ["import", "open", "exec", "eval", "subprocess", "os", "sys", "shutil", "rm"]
    if any(keyword in user_code for keyword in forbidden_keywords):
        return jsonify({"output": "Error: Unsafe code detected"})

    # Generate a unique filename to avoid conflicts
    script_filename = "temp_script.py"

    try:
        # Write the user code to a temporary Python script
        with open(script_filename, "w") as script_file:
            script_file.write(user_code)  # Append the test input execution

        # Execute the script and capture output
        result = subprocess.run(
            [sys.executable, script_filename],  # Cross-platform execution
            capture_output=True,
            text=True,
            timeout=3,
            input=test_input  # Pass predefined input
        )

        # Get the output
        output = result.stdout.strip() if result.stdout else result.stderr.strip()
        return jsonify({"output": output})

    except subprocess.TimeoutExpired:
        return jsonify({"output": "Error: Execution timed out"})
    except Exception as e:
        error_message = "".join(traceback.format_exception_only(type(e), e)).strip()
        return jsonify({"output": f"Error: {error_message}"})

    finally:
        # Ensure the temporary script is deleted after execution
        if os.path.exists(script_filename):
            os.remove(script_filename)