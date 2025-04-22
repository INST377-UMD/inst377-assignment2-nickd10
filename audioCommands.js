<script src="https://cdnjs.cloudflare.com/ajax/libs/annyang/2.6.1/annyang.min.js"></script>

const commands = {
    'hello': () => { alert('Hello World!'); },
    'Change color to *tag': (term) => { alert(document.body.style.backgroundColor(term)); },
    'go to section :section': (section) => {
      // Code to navigate to the specified section
      alert('Navigating to section ' + section);
    }
  };

  if (annyang) {
    annyang.addCommands(commands);
  }

  function startListening() {
  if (annyang) {
    annyang.start();
  }
}

 function stopListening() {
    if(annyang) {
        annyang.abort();
    }
 }