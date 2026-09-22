# 🛡️ AI Time Machine - Security Policy & Data Integrity

**AI Time Machine V3** is designed with privacy, data integrity, and evidence safety as primary principles. This document outlines our security posture, data handling policies, and vulnerability disclosure procedures.

---

## 🔒 Security Measures & Data Safeguards

### 1. Evidence Integrity & Hallucination Firewall
- **Zero Evidence Fabrication**: Every AI inference is audited against physical artifact sources. Reconstructions map explicit claim IDs (`CLM-XXXX`) back to raw file content or commit hashes.
- **Cryptographic Version Signatures**: Exported certificates use SHA-256 digests to verify artifact provenance and detect unauthorized modifications.

### 2. Client-Side & Local Processing Security
- **Local Artifact Analysis**: Uploaded files and ZIP archives are processed locally within browser memory or isolated sandboxes. Raw artifact data is never permanently retained or repurposed for AI training.
- **Content Security Policy (CSP)**: Strict frame ancestor restriction (`X-Frame-Options: DENY`), script execution scoping, and MIME-type sniffing protection (`X-Content-Type-Options: nosniff`).

### 3. API & Fetcher Security
- **GitHub API Rate Limiting**: Request handling utilizes authenticated GitHub REST API scopes with token obfuscation to protect user credentials.
- **Sanitized Remote Fetching**: External URL fetching and Git cloning execute within strict payload limits and isolated execution boundaries.

---

## 🐛 Vulnerability Reporting Procedure

If you discover a security vulnerability or data integrity risk in AI Time Machine, please report it responsibly:

1. **Security Contact**: Email `k.monishwaran123@gmail.com`
2. **Subject Line**: `[SECURITY VULNERABILITY] AI Time Machine - <Brief Summary>`
3. **Response SLA**: Vulnerability reports will be acknowledged within 24 hours, with patch timelines provided within 72 hours.

Please do **NOT** open public GitHub issues for security vulnerabilities before a patch is released.

---

## 📜 Compliance & License

Distributed under the **MIT License**. See [`LICENSE`](file:///c:/Users/kmoni/Downloads/ai/LICENSE) for details.
