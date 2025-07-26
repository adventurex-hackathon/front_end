from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import uuid
from werkzeug.utils import secure_filename
import subprocess
import tempfile
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {
    'py', 'js', 'ts', 'jsx', 'tsx', 'html', 'css', 'java', 
    'cpp', 'c', 'go', 'rs', 'php', 'rb', 'swift', 'kt'
}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create upload folder if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def analyze_code(file_path, question=None):
    """
    Analyze the uploaded code and generate a response.
    This is a placeholder implementation - you would integrate with your actual analysis logic.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            code_content = f.read()
        
        # Placeholder analysis - replace with your actual logic
        analysis_result = {
            'lines_of_code': len(code_content.split('\n')),
            'file_size': len(code_content),
            'language': file_path.split('.')[-1].upper(),
            'complexity': 'Medium' if len(code_content) > 100 else 'Low'
        }
        
        # Generate sample Manim code (replace with your actual generation logic)
        sample_manim_code = f'''from manim import *

class CodeExplanation(Scene):
    def construct(self):
        # Title
        title = Text("Code Analysis", font_size=48)
        title.to_edge(UP)
        self.play(Write(title))
        
        # Code block
        code_block = Code(
            code="""{code_content[:200]}...""",
            language="Python",
            tab_width=4,
            background_color=DARK_GRAY,
        ).scale(0.7)
        
        self.play(Create(code_block))
        self.wait(2)
        
        # Analysis results
        analysis_text = Text(f"Lines: {analysis_result['lines_of_code']}", font_size=24)
        analysis_text.next_to(code_block, DOWN, buff=1)
        self.play(Write(analysis_text))
        self.wait(1)
        
        # User question if provided
        if question:
            question_text = Text(f"Q: {question}", font_size=20, color=YELLOW)
            question_text.next_to(analysis_text, DOWN, buff=0.5)
            self.play(Write(question_text))
            self.wait(1)
        
        self.wait(2)'''
        
        return {
            'analysis': f"Analyzed {analysis_result['language']} file with {analysis_result['lines_of_code']} lines of code. Complexity: {analysis_result['complexity']}.",
            'code': sample_manim_code,
            'videoUrl': None  # In a real implementation, this would be the URL to the generated video
        }
        
    except Exception as e:
        return {
            'analysis': f"Error analyzing code: {str(e)}",
            'code': None,
            'videoUrl': None
        }

@app.route('/')
def home():
    return jsonify({
        'message': 'Welcome to the Flask app!',
        'endpoints': {
            'upload': '/upload',
            'health': '/health'
        }
    })

@app.route('/health')
def health():
    return jsonify({
        'status': 'healthy',
        'message': 'Backend is running'
    })

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({
                'success': False,
                'message': 'No file provided',
                'error': 'No file part in the request'
            }), 400
        
        file = request.files['file']
        
        # Check if file was selected
        if file.filename == '':
            return jsonify({
                'success': False,
                'message': 'No file selected',
                'error': 'No file selected'
            }), 400
        
        # Check if file type is allowed
        if not allowed_file(file.filename):
            return jsonify({
                'success': False,
                'message': 'File type not allowed',
                'error': f'Allowed file types: {", ".join(ALLOWED_EXTENSIONS)}'
            }), 400
        
        # Get optional question
        question = request.form.get('question', None)
        
        # Save file
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(file_path)
        
        # Analyze the code
        analysis_result = analyze_code(file_path, question)
        
        # Clean up uploaded file
        try:
            os.remove(file_path)
        except:
            pass  # Ignore cleanup errors
        
        return jsonify({
            'success': True,
            'message': 'File uploaded and analyzed successfully',
            'data': analysis_result
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Upload failed',
            'error': str(e)
        }), 500

@app.route('/generate-video', methods=['POST'])
def generate_video():
    """
    Endpoint to generate video from Manim code.
    This would integrate with your actual Manim rendering pipeline.
    """
    try:
        data = request.get_json()
        manim_code = data.get('code')
        
        if not manim_code:
            return jsonify({
                'success': False,
                'message': 'No Manim code provided',
                'error': 'Code parameter is required'
            }), 400
        
        # Create temporary file for Manim code
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as f:
            f.write(manim_code)
            temp_file = f.name
        
        try:
            # Run Manim (this is a placeholder - implement your actual rendering logic)
            # result = subprocess.run(['manim', '-pql', temp_file, 'CodeExplanation'], 
            #                        capture_output=True, text=True, timeout=60)
            
            # For now, return a placeholder response
            video_url = f"https://example.com/videos/{uuid.uuid4()}.mp4"
            
            return jsonify({
                'success': True,
                'message': 'Video generated successfully',
                'data': {
                    'videoUrl': video_url
                }
            })
            
        finally:
            # Clean up temporary file
            try:
                os.unlink(temp_file)
            except:
                pass
                
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Video generation failed',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 