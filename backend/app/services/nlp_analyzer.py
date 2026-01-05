"""
NLP Analyzer Service
Detects marketing tactics in text using rule-based patterns
"""

import re
from typing import List, Dict, Tuple

# Tactic detection patterns
TACTIC_PATTERNS = {
    "Urgency": [
        r'\b(limited|urgent|hurry|expires?|soon|act now|don\'t wait|quickly)\b',
        r'\b(only \d+ left|stock running out|last chance|ending soon)\b',
        r'\b(time.?s? running|hurry up|don\'t delay|immediate)\b'
    ],
    "Trust Building": [
        r'\b(verified|trusted|reliable|guaranteed|escrow|reputation|established)\b',
        r'\b(proven|legit|legitimate|secure|safe|dependable)\b',
        r'\b(trust.?worthy|credible|authentic|official)\b'
    ],
    "Social Proof": [
        r'\b(reviews?|testimonials?|satisfied|customers?|clients?|users?)\b',
        r'\b(\d+[+]?\s*(reviews?|sales?|transactions?|orders?))\b',
        r'\b(top.?rated|best.?seller|popular|recommended)\b',
        r'\b(join \d+[+]?\s*(customers?|users?|members?))\b'
    ],
    "Limited Supply": [
        r'\b(only \d+|limited stock|running out|few left|almost gone)\b',
        r'\b(limited quantity|while supplies last|stock limited)\b',
        r'\b(only a few|almost sold out|nearly gone)\b'
    ],
    "FOMO": [
        r'\b(don\'t miss|join now|exclusive|invite only|members only)\b',
        r'\b(once in a lifetime|rare opportunity|special offer)\b',
        r'\b(you\'ll regret|miss out|exclusive access)\b'
    ],
    "Repetition": [
        r'\b(buy now|order now|get it now)\b',  # Repeated phrases
    ],
    "Exclusivity": [
        r'\b(exclusive|vip|premium|elite|select|private)\b',
        r'\b(invite.?only|members.?only|by invitation)\b',
        r'\b(limited.?access|restricted|special.?group)\b'
    ],
    "Testimonials": [
        r'\b(customer said|user reported|client feedback)\b',
        r'\b(".*"|".*"|testimonial|review from)\b',
        r'\b(according to|as reported by|verified user)\b'
    ]
}

# Marketing keywords (additional signals)
MARKETING_KEYWORDS = [
    'buy', 'sell', 'price', 'discount', 'deal', 'offer', 'sale',
    'cheap', 'affordable', 'best price', 'lowest', 'bargain',
    'order', 'purchase', 'available', 'in stock', 'shipping'
]

def detect_tactics(text: str) -> List[str]:
    """
    Detect marketing tactics in text using pattern matching.
    
    Args:
        text: Input text to analyze
        
    Returns:
        List of detected tactic names
    """
    if not text or not isinstance(text, str):
        return []
    
    detected = []
    text_lower = text.lower()
    
    for tactic, patterns in TACTIC_PATTERNS.items():
        for pattern in patterns:
            if re.search(pattern, text_lower, re.IGNORECASE):
                if tactic not in detected:
                    detected.append(tactic)
                break
    
    return detected

def is_marketing_post(text: str) -> Tuple[bool, float]:
    """
    Determine if a post is marketing-related.
    
    Args:
        text: Input text to analyze
        
    Returns:
        Tuple of (is_marketing: bool, confidence: float)
    """
    if not text or not isinstance(text, str):
        return False, 0.0
    
    text_lower = text.lower()
    
    # Count tactic matches
    tactics = detect_tactics(text)
    tactic_score = len(tactics) * 0.3
    
    # Count marketing keywords
    keyword_matches = sum(1 for kw in MARKETING_KEYWORDS if kw in text_lower)
    keyword_score = min(keyword_matches * 0.1, 0.4)
    
    # Check for promotional language patterns
    promotional_patterns = [
        r'\$\d+',  # Prices
        r'\d+%?\s*(off|discount)',  # Discounts
        r'free\s+shipping',
        r'buy\s+(now|today)',
    ]
    promo_score = sum(0.1 for pattern in promotional_patterns if re.search(pattern, text_lower))
    
    # Total confidence score
    confidence = min(tactic_score + keyword_score + promo_score, 1.0)
    is_marketing = confidence >= 0.3  # Threshold
    
    return is_marketing, confidence

def analyze_post(text: str) -> Dict:
    """
    Complete analysis of a post.
    
    Args:
        text: Input text to analyze
        
    Returns:
        Dictionary with analysis results
    """
    tactics = detect_tactics(text)
    is_marketing, confidence = is_marketing_post(text)
    
    return {
        "is_marketing": is_marketing,
        "confidence": confidence,
        "tactics": tactics,
        "tactic_count": len(tactics)
    }

def extract_entities(text: str) -> Dict:
    """
    Extract basic entities from text (vendor names, products, etc.)
    Simple implementation - can be enhanced with spaCy/NER models.
    """
    # Extract potential vendor names (capitalized words, usernames)
    vendor_pattern = r'\b[A-Z][a-z]+(?:_[A-Z][a-z]+)*\b'
    potential_vendors = re.findall(vendor_pattern, text)
    
    # Extract prices
    price_pattern = r'\$?\d+\.?\d*\s*(USD|BTC|EUR)?'
    prices = re.findall(price_pattern, text, re.IGNORECASE)
    
    return {
        "potential_vendors": list(set(potential_vendors)),
        "prices": prices
    }

