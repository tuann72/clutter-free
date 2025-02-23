from flask import Flask, request, jsonify
from flask_cors import CORS  # For handling CORS
from dotenv import load_dotenv
import openai
import os

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure OpenAI API
openai.api_key = os.environ.get("OPENAI_API_KEY")
client = openai.OpenAI()

@app.route('/api/generate', methods=['POST'])
def generate_response():
    try:
        # Get input from frontend
        data = request.get_json()
        user_input = data.get('prompt')

        if not user_input:
            return jsonify({"error": "No prompt provided"}), 400

        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": user_input}
            ]
        )

        # Extract and return the response
        result = response.choices[0].message.content
        return jsonify({"response": result})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)