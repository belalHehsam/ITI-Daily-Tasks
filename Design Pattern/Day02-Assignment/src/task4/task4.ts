// Component
interface BookComponent {
  showHierarchy(indentation?: string): void;
  getPages(): number;
}

class Book implements BookComponent {
  constructor(
    private name: string,
    private pages: number,
  ) {}

  showHierarchy(indentation: string = ""): void {
    console.log(`${indentation}Book: ${this.name} (${this.pages} pages)`);
  }

  getPages(): number {
    return this.pages;
  }
}

class Box implements BookComponent {
  private items: BookComponent[] = [];

  constructor(private name: string) {}

  add(item: BookComponent): void {
    this.items.push(item);
  }

  showHierarchy(indentation: string = ""): void {
    console.log(`${indentation}Box: ${this.name}`);

    for (const item of this.items) {
      item.showHierarchy(indentation + "   ");
    }
  }

  getPages(): number {
    let totalPages = 0;

    for (const item of this.items) {
      totalPages += item.getPages();
    }

    return totalPages;
  }
}

const book1 = new Book("JavaScript", 300);
const book2 = new Book("TypeScript", 250);
const book3 = new Book("Design Patterns", 400);
const book4 = new Book("Node.js", 350);

const frontendBox = new Box("Frontend Books");

frontendBox.add(book1);
frontendBox.add(book2);

const backendBox = new Box("Backend Books");

backendBox.add(book4);

const mainBox = new Box("Programming Books");

mainBox.add(frontendBox);
mainBox.add(book3);
mainBox.add(backendBox);

mainBox.showHierarchy();

console.log(`Total Pages: ${mainBox.getPages()}`);
