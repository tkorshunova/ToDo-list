const $list = $('.list');
const $input = $('#add-input');
const $add = $('#add-submit');

(function ($) {

  $.fn.todoList = function () {
    const storageName = 'tasks';

    createList()

    function createList() {
      const storage = JSON.parse(localStorage.getItem(storageName));

      if (storage && storage.length) {
        storage.forEach(item => {
          $list.append(
            $('<li>').addClass('item')
              .append($('<span>').addClass('item-text').text(item.text))
              .append($('<button>').addClass('item-remove').text('Remove'))
          );
          if (item.done === true) {
            $('.item-text').addClass('done');
          }
        })
      }
    }

    $add.click(function (event) {
      event.preventDefault();
      // If something is written
      if ($input.val().length !== 0) {

        //update
        let text = $input.val();

        const storageTasks = JSON.parse(localStorage.getItem(storageName));

        if (storageTasks) {
          storageTasks.push({
            text: text,
            done: false
          });
          localStorage.setItem(storageName, JSON.stringify(storageTasks));
        } else {
          const newTasks = [];
          newTasks.push({
            text: text,
            done: false
          });
          localStorage.setItem(storageName, JSON.stringify(newTasks));
        }
      }

      $('.item').remove();
      createListOfTasks();

      $input.val('');
    });

    function createListOfTasks() {
      const storage = JSON.parse(localStorage.getItem(storageName));

      if (storage && storage.length) {
        storage.forEach(item => {
          $list.append(
            $('<li>').addClass('item')
              .append($('<span>').addClass('item-text').text(item.text))
              .append($('<button>').addClass('item-remove').text('Remove'))
          );
        })
      }
    }

    // When Task is clicked
    $(document).on('click', '.item-text', function () {
      const storageTasks = JSON.parse(localStorage.getItem(storageName));
      const index = storageTasks.findIndex(item => item.text === $(this).text());

      if (this.className === 'item-text') {
        this.className = 'item-text done';
        storageTasks[index].done = true;
        localStorage.setItem(storageName, JSON.stringify(storageTasks));
      } else if (this.className === 'item-text done') {
        this.classList.remove('done');
        storageTasks[index].done = false;
        localStorage.setItem(storageName, JSON.stringify(storageTasks));
      }
    });

    //remove item 
    $(document).on('click', '.item-remove', function () {
      let parent = $(this).parent();
      let text = parent.children('.item-text').text();
      const storageTasks = JSON.parse(localStorage.getItem(storageName));
      let index = storageTasks.findIndex(item => item.text === text)
      $(this).parent().remove();
      storageTasks.splice(index, 1);
      localStorage.setItem(storageName, JSON.stringify(storageTasks));
    });

    //search
    $('#task-search').on('keyup', function () {
      const storageTasks = JSON.parse(localStorage.getItem(storageName));
      let value = $(this).val().toLowerCase();
      let arr = storageTasks.filter(task => task.text.toLowerCase().startsWith(value))

      $('.item').remove();
      arr.forEach((item, index) => {
        $list.append($('<li>').addClass('item')
          .append($('<span>').addClass('item-text').attr('id', index).text(item.text))
          .append($('<button>').addClass('item-remove').text('Remove')))

        if (item.done) {
          $(`#${index}`).addClass('done')
        }
      })
    });
  }
}(jQuery));

$().todoList();
