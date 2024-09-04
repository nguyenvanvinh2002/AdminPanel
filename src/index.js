
  document.addEventListener('DOMContentLoaded', function() {
    var modalElement = document.getElementById('editModal');
    var modal = new bootstrap.Modal(modalElement);
    document.querySelector('.btn-edit').addEventListener('click', function() {
      modal.hide();
      document.getElementById('editForm').reset();
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    var modalElement = document.getElementById('confirmDeleteModal');
    var modal = new bootstrap.Modal(modalElement);
    document.querySelector('.btn-remove').addEventListener('click', function() {
      modal.hide();
    });
  });