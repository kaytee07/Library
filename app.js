  
  const collections = document.querySelector(".collection");
    const submit = document.querySelector(".submit");
    const form = document.querySelector("form");
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const pages = document.querySelector("#pages");
    const read = document.querySelector(".read");
      

    function Library(){
      this.collection = [];
      this.numberOfBooks = 0;
      this.booksRead = 0;
    }

    const library = new Library();
     
    let collection = library.collection;
    render(collection);

    Library.prototype.increaseNumberOfBooks = function(){
      library.numberOfBooks++
    }

    Library.prototype.decreaseNumberOfBooks = function(){
      library.numberOfBooks--;
    }

    Library.prototype.read = function(){
      library.booksRead++;
    }

    Library.prototype.notRead = function () {
      library.booksRead--;
    };

    Library.prototype.alreadyExist = function(){
      let itExist = collection.some((books)=>{
        if(this.name === books.name){
          return true
        }
      })
      return itExist
    }

    Library.prototype.addBookToLibrary = function(){
     if(this.alreadyExist()){
       return alert("it already exist")
     }
     console.log(this)
     collection.push(this);
     library.increaseNumberOfBooks();
     render(collection);
    }

    Library.prototype.removeFromLibrary = function () {
       collection = collection.filter((books) => {
         if (this.name !== books.name) {
           return books;
         }
       });
        library.decreaseNumberOfBooks();
        render(collection);
     };

    function Book(name, author, numberOfPages, read=false) {
      this.name = name;
      this.author = author;
      this.numberOfPages = numberOfPages;
      this.read = read;
    }

    Book.prototype = new Library();

     if (localStorage.getItem("libraryCollection")) {
       let libraryBooks = JSON.parse(localStorage.getItem("libraryCollection"));
       libraryBooks.map((items) => {
         new Book(
           items.name,
           items.author,
           items.numberOfPages,
           items.read
         ).addBookToLibrary();
       });
     }

    Book.prototype.isRead = function () {
      if(this.read){
        this.read = false;
        library.notRead()
      }else{
        this.read = true;
        library.read();
      }
      render(collection);
     };

  
  //user interface
    
    function render(collection) {
      let html = ``;
      collection.map((book, index) => {
        let books = `
              
                       <div class="main-card">
                         <div
                           class="card"
                           style="color:white; margin-bottom: 1rem;"
                         >
                           <div style="text-align: center;">
                             <h4>${book.name}</h4>
                           </div>
                           <div style="text-align: center;">
                             <h5>
                               Pages:<span>${book.numberOfPages}</span>
                             </h5>
                             <span style="display: none;">${index}</span>
                           </div>
                         </div>
                         <p class="author">${book.author}</p>
                         <div class="both">
                           <p class="read d-flex">
                             ${book.read ? "read" : "not read"}
                             <span>
                               <i class="bi bi-check2-all"></i>
                             </span>
                           </p>
                           <i class="bin bi bi-trash"></i>
                         </div>
                       </div>
  
            `;
        html += books;
      });
      collections.innerHTML = html;

      const bin = document.querySelectorAll(".bin");
      const readButton = document.querySelectorAll(".read")
        bin.forEach(ele=>{
          ele.addEventListener("click", function (event) {
                removeBookFromLibrary(event.target.parentElement.parentElement.firstElementChild.lastElementChild.lastElementChild.innerHTML)
          });
        })
      

      readButton.forEach((ele) => {
          ele.addEventListener("click", function (event) {
           readit(
            event.target.parentElement.parentElement.firstElementChild.lastElementChild.lastElementChild.innerHTML
             );
                });
              });
    }

    function addBookToLibrary(title, author, pages) {
      console.log(new Book(title, author, pages).addBookToLibrary())
      localStorage.setItem(
        "libraryCollection",
        JSON.stringify(library.collection)
      );
    }

    function removeBookFromLibrary(title){
      const books = collection[title];
      books.removeFromLibrary();
       if (collection.length >= 1){
          books.removeFromLibrary();
          return localStorage.setItem(
            "libraryCollection",
            JSON.stringify(collection)
          );    
       }
        books.removeFromLibrary();
        return localStorage.clear(
          "libraryCollection",
          JSON.stringify(library.collection)
        );
    }

    function readit(title) {
      const books = collection[title]
      books.isRead()
      localStorage.setItem(
        "libraryCollection",
        JSON.stringify(library.collection)
      );
    }

    console.log(library.collection[0])
  
    submit.addEventListener("click", function(event){
        event.preventDefault()
        addBookToLibrary(title.value, author.value, pages.value)
    })

     



