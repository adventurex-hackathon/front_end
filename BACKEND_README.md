# Flask Backend for Code Visualization

This Flask backend handles file uploads and code analysis for the code visualization frontend.

## Setup Instructions

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Backend

```bash
python flask_backend_example.py
```

The server will start on `http://localhost:5000`

### 3. Using with ngrok (for external access)

If you want to expose your local Flask server to the internet (like your current ngrok setup):

```bash
# Install ngrok if you haven't already
# Download from https://ngrok.com/

# Start your Flask app
python flask_backend_example.py

# In another terminal, expose it with ngrok
ngrok http 5000
```

## API Endpoints

### 1. Health Check
- **URL**: `GET /`
- **Response**: Welcome message and available endpoints

### 2. Health Status
- **URL**: `GET /health`
- **Response**: Backend health status

### 3. File Upload
- **URL**: `POST /upload`
- **Content-Type**: `multipart/form-data`
- **Parameters**:
  - `file`: The code file to upload
  - `question` (optional): User's question about the code

**Response Format**:
```json
{
  "success": true,
  "message": "File uploaded and analyzed successfully",
  "data": {
    "analysis": "Analysis text...",
    "code": "Generated Manim code...",
    "videoUrl": "URL to generated video (if available)"
  }
}
```

### 4. Video Generation
- **URL**: `POST /generate-video`
- **Content-Type**: `application/json`
- **Body**: `{"code": "Manim code to render"}`

## Supported File Types

- Python (`.py`)
- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)
- HTML (`.html`)
- CSS (`.css`)
- Java (`.java`)
- C/C++ (`.c`, `.cpp`)
- Go (`.go`)
- Rust (`.rs`)
- PHP (`.php`)
- Ruby (`.rb`)
- Swift (`.swift`)
- Kotlin (`.kt`)

## Customization

### 1. Code Analysis Logic

Replace the `analyze_code()` function in `flask_backend_example.py` with your actual code analysis logic:

```python
def analyze_code(file_path, question=None):
    # Your custom analysis logic here
    # This could include:
    # - AST parsing
    # - Complexity analysis
    # - AI-powered code understanding
    # - Custom visualization generation
    pass
```

### 2. Manim Integration

To integrate with actual Manim rendering, uncomment and modify the Manim execution code in the `generate_video()` function:

```python
# Run Manim
result = subprocess.run(['manim', '-pql', temp_file, 'CodeExplanation'], 
                       capture_output=True, text=True, timeout=60)
```

### 3. File Storage

For production, consider using cloud storage (AWS S3, Google Cloud Storage) instead of local file storage.

## Error Handling

The backend includes comprehensive error handling for:
- Missing files
- Invalid file types
- File size limits
- Processing errors
- Network issues

## CORS Configuration

CORS is enabled for all origins. For production, you should restrict this to your frontend domain:

```python
CORS(app, origins=['https://your-frontend-domain.com'])
```

## Security Considerations

1. **File Validation**: Always validate uploaded files
2. **File Size Limits**: Set appropriate file size limits
3. **CORS**: Restrict CORS origins in production
4. **Input Sanitization**: Sanitize user inputs
5. **Rate Limiting**: Implement rate limiting for production use

## Environment Variables

Create a `.env` file for configuration:

```env
FLASK_ENV=development
MAX_FILE_SIZE=16777216
UPLOAD_FOLDER=uploads
ALLOWED_EXTENSIONS=py,js,ts,jsx,tsx,html,css
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure CORS is properly configured
2. **File Upload Fails**: Check file size limits and allowed extensions
3. **Manim Not Found**: Ensure Manim is installed and in PATH
4. **Port Already in Use**: Change the port in `app.run(port=5001)`

### Debug Mode

Run with debug mode for detailed error messages:

```python
app.run(debug=True, host='0.0.0.0', port=5000)
``` 