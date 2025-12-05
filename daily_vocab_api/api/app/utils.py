import requests
import random

# URL ของ n8n (ใน Docker เราเรียกผ่านชื่อ service "n8n" ได้เลย)
# หมายเหตุ: ต้อง Activate Workflow ใน n8n ก่อน URL ถึงจะเป็น /webhook/ (ไม่มี -test)
N8N_WEBHOOK_URL = "http://n8n:5678/webhook/validate-sentence"

def mock_ai_validation(sentence: str, target_word: str, difficulty: str) -> dict:
    """
    ฟังก์ชันส่งข้อมูลไปให้ n8n (AI) ตรวจสอบความถูกต้อง
    """
    try:
        # 1. ยิงข้อมูลไปที่ n8n
        response = requests.post(
            N8N_WEBHOOK_URL,
            json={
                "sentence": sentence,
                "target_word": target_word,
                "difficulty": difficulty
            },
            timeout=30 # รอ AI คิดนานหน่อย (30 วินาที)
        )
        
        # 2. ถ้าสำเร็จ ส่งค่า JSON ที่ได้จาก n8n กลับไปเลย
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error from n8n: {response.status_code} - {response.text}")

    except Exception as e:
        print(f"Connection Error to n8n: {e}")

    # 3. Fallback: ถ้า n8n พัง หรือลืมเปิด ให้ส่งค่า Mock กลับไปแทน แอปจะได้ไม่ล่ม
    return {
        "score": 0.0,
        "level": difficulty,
        "suggestion": "System Error: Could not connect to AI service (n8n). Please check logs.",
        "corrected_sentence": sentence
    }