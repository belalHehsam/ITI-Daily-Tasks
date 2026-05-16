class Document {
    constructor(header, footer, pages, text) {
        this.header = header;
        this.footer = footer;
        this.pages = pages;
        this.text = text
    }

    Clone() {
        return new Document(this.header, this.footer, this.pages, this.text)
    }
}

const d1 = new Document("header", "footer", "pages1", "this is D1");

const d2 = d1.Clone();
d2.text = "this is D2";

console.log("Document 1", d1);
console.log("Document 2", d2);
