//Storage controller
const StorageCtrl = (function() {})();

//Editor controller
const EditorCtrl = (function() {
  return {
    editButtonsFunctions: function(e) {
      switch (e.target.className) {
        case (e.target.className = 'fas fa-bold'):
          document.execCommand('bold');
          break;

        case (e.target.className = 'fas fa-italic'):
          document.execCommand('italic');
          break;

        case (e.target.className = 'fas fa-underline'):
          document.execCommand('underline');
          break;
        case (e.target.className = 'fas fa-strikethrough'):
          document.execCommand('strikeThrough');
          break;

        case (e.target.className = 'fas fa-highlighter'):
          document.execCommand('backColor', false, 'green');
          break;

        case (e.target.className = 'fas fa-align-center'):
          document.execCommand('justifyCenter');
          break;

        case (e.target.className = 'fas fa-align-justify'):
          document.execCommand('justifyFull');
          break;

        case (e.target.className = 'fas fa-align-left'):
          document.execCommand('justifyLeft');
          break;

        case (e.target.className = 'fas fa-align-right'):
          document.execCommand('justifyRight');
          break;

        case (e.target.className = 'fas fa-outdent'):
          document.execCommand('outdent');
          break;

        case (e.target.className = 'fas fa-indent'):
          document.execCommand('indent');
          break;

        case (e.target.className = 'fas fa-trash'):
          document.execCommand('removeFormat');
          break;

        case (e.target.className = 'fas fa-subscript'):
          document.execCommand('subscript');
          break;

        case (e.target.className = 'fas fa-superscript'):
          document.execCommand('superscript');
          break;

        case (e.target.className = 'fas fa-paragraph'):
          document.execCommand('insertParagraph');
          break;

        case (e.target.className = 'fas fa-list-ol'):
          document.execCommand('insertOrderedList');
          break;

        case (e.target.className = 'fas fa-list'):
          document.execCommand('insertUnorderedList');
          break;

        case (e.target.className = 'fas fa-undo'):
          document.execCommand('undo');
          break;

        case (e.target.className = 'fas fa-redo'):
          document.execCommand('redo');
          break;

        case (e.target.className = 'buttons'):
          break;

        default:
          break;
      }
    },
    editFont: function(e) {
      let font = e.target.value;
      document.execCommand('fontName', false, font);
    },

    createDoc: function() {
      let element = '.text';
      let filename = 'document';

      const preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
      const postHtml = '</body></html>';
      const html =
        preHtml + document.querySelector(element).innerHTML + postHtml;

      const blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
      });

      // Specify link url
      const url =
        'data:application/vnd.ms-word;charset=utf-8,' +
        encodeURIComponent(html);

      // Specify file name
      filename = filename ? filename + '.doc' : 'document.doc';

      // Create download link element
      let downloadLink = document.createElement('a');

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }

      document.body.removeChild(downloadLink);
    }
  };
})();

//List controller
const ListCtrl = (function() {
  const listConstructor = function(id, listContent, nameButton) {
    this.id = id;
    this.listContent = listContent;
    this.nameButton = nameButton;
  };

  const list = {
    items: [
      {
        id: 0,
        listContent:
          '<div contenteditable="true" class="text" id="0">Привет!</div>',
        nameButton: 'List 1'
      },
      {
        id: 1,
        listContent:
          '<div contenteditable="true" class="text" id="1">Привет!</div>',
        nameButton: 'List 2'
      },
      {
        id: 2,
        listContent:
          '<div contenteditable="true" class="text" id="2">Привет!</div>',
        nameButton: 'List 3'
      }
    ],
    currentList: null
  };
  return {
    getLists: function() {
      return list.items;
    },
    getCurrentList: function() {
      return list.currentList;
    },

    logLists: function() {
      return list;
    },

    deleteItem: function(id) {
      //Get ids

      const ids = list.items.map(function(item) {
        return item.id;
      });

      //Get index

      const index = ids.indexOf(id);

      //Remove item
      list.items.splice(index, 1);
    },

    addNewList: function() {
      if (list.items.length == 6) {
        alert('Ты создал много листов. Удали парочку лишних');
      } else {
        let id;
        //Create ID
        if (list.items.length > 0) {
          id = list.items.length;
        } else {
          id = 0;
        }
        let listContent = `<div contenteditable="true" class="text" id="${id}">Привет!</div>`;

        let nameButton = `List ${id + 1}`;

        let newList = new listConstructor(id, listContent, nameButton);

        list.items.push(newList);

        return newList;
      }
    },

    setCurrentList: function(newList) {
      list.currentList = newList;
    },
    setCurrentListContent: function(newContent) {
      list.currentList.listContent = newContent;
    },
    getItemById: function(id) {
      let found = null;

      list.items.forEach(function(item) {
        if (item.id == id) {
          found = item;
        }
      });
      return found;
    },
    updateListItems: function(updateItem) {
      list.items.forEach(function(item, index) {
        if (list.currentList.id === item.id) {
          list.items.splice(index, 1, updateItem);
        }
      });
    }
  };
})();

//UI controller
const UICtrl = (function() {
  const UISelectors = {
    editButtons: '.buttons',
    editFont: '#fonts',
    createDoc: '.createDoc',
    addNewList: '.btn-success',
    listButtons: '#listButtons',
    listWrapper: '.text-document',
    editPlace: '.text',
    deleteBtn: '.fa-times'
  };

  return {
    getSelectors: function() {
      return UISelectors;
    },

    populateListButtons: function(items) {
      let html = '';
      items.forEach(item => {
        html += `<button type="button" class="btn btn-primary"  id="${item.id}">
              ${item.nameButton} <i class="fas fa-times delete-button"></i>
            </button>`;
      });

      //Insert list items
      document.querySelector(UISelectors.listButtons).innerHTML = html;
    },

    deleteListItem: function(deleteButton) {
      deleteButton.remove();
    },
    showCurrentList: function() {
      document.querySelector(
        UISelectors.listWrapper
      ).innerHTML = ListCtrl.getCurrentList().listContent;
    }
  };
})();

//App controller
const App = (function(UICtrl, ListCtrl, EditorCtrl, StorageCtrl) {
  const loadAllEventListeners = function() {
    const UISelectors = UICtrl.getSelectors();

    document
      .querySelector(UISelectors.editButtons)
      .addEventListener('click', editButtonsListeners);

    document
      .querySelector(UISelectors.editFont)
      .addEventListener('change', editFontListeners);

    document
      .querySelector(UISelectors.createDoc)
      .addEventListener('click', export2Doc);

    document
      .querySelector(UISelectors.addNewList)
      .addEventListener('click', addNewList);

    document
      .querySelector(UISelectors.listButtons)
      .addEventListener('click', showListData);
    document
      .querySelector(UISelectors.listButtons)
      .addEventListener('click', itemDeleteSubmit);
  };

  const itemDeleteSubmit = function(e) {
    if (e.target.classList.contains('delete-button')) {
      console.log(e.target.parentElement);
      let deleteButton = e.target.parentElement;
      UICtrl.deleteListItem(deleteButton);

      let id = e.target.parentElement;
      ListCtrl.deleteItem(id);

      let currentList = ListCtrl.getCurrentList();
      if ((currentList.id = id)) {
        let textContent = document.querySelector('.text');
        textContent.textContent = '';
      }
    }

    e.preventDefault();
  };

  const addNewList = function(e) {
    let newList = ListCtrl.addNewList();
    ListCtrl.setCurrentList(newList);

    let currentList = ListCtrl.getCurrentList();
    ListCtrl.updateListItems(currentList);

    const items = ListCtrl.getLists();
    UICtrl.populateListButtons(items);
    UICtrl.showCurrentList();
    e.preventDefault();
  };

  const showListData = function(e) {
    if (e.target.classList.contains('btn-primary')) {
      let currentList = ListCtrl.getCurrentList();
      if (currentList == null) {
        const listId = e.target.id;
        const itemToShow = ListCtrl.getItemById(listId);

        ListCtrl.setCurrentList(itemToShow);
        UICtrl.showCurrentList();
      } else {
        let updateContent = document.querySelector('.text').outerHTML;
        ListCtrl.setCurrentListContent(updateContent);
        ListCtrl.updateListItems(currentList);

        const listId = e.target.id;
        const itemToShow = ListCtrl.getItemById(listId);

        ListCtrl.setCurrentList(itemToShow);
        UICtrl.showCurrentList();
      }
    }

    e.preventDefault();
  };

  const editButtonsListeners = function(e) {
    EditorCtrl.editButtonsFunctions(e);

    e.preventDefault();
  };

  const editFontListeners = function(e) {
    EditorCtrl.editFont(e);

    e.preventDefault();
  };

  const export2Doc = function(e) {
    EditorCtrl.createDoc();

    e.preventDefault();
  };

  return {
    init: function() {
      const items = ListCtrl.getLists();

      UICtrl.populateListButtons(items);

      loadAllEventListeners();
    }
  };
})(UICtrl, ListCtrl, EditorCtrl, StorageCtrl);
App.init();
