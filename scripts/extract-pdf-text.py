#!/usr/bin/env python3
from pathlib import Path

from pypdf import PdfReader


def main() -> None:
    output_dir = Path(".artifacts/pdf-text")
    output_dir.mkdir(parents=True, exist_ok=True)

    for pdf_path in sorted(Path("public").glob("*.pdf")):
        reader = PdfReader(str(pdf_path))
        parts = []
        for index, page in enumerate(reader.pages, start=1):
            text = page.extract_text() or ""
            parts.append(f"--- page {index} ---\n{text}")

        output_path = output_dir / f"{pdf_path.stem}.txt"
        output_path.write_text("\n".join(parts), encoding="utf-8")
        print(f"{pdf_path}: {len(reader.pages)} pages -> {output_path}")


if __name__ == "__main__":
    main()
