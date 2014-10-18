var CloseModal = window.CloseModal = {
  init: function () {
    $(document).on('click', '.js-close-modal', function () {
      $('#newEvent').modal('hide');
    });
  }
};
