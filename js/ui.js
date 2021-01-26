document.addEventListener('DOMContentLoaded', function() {
  // reading from the dom (this is not in the course. i did it myself)
  const menus = document.querySelectorAll('.side-menu');
  const forms = document.querySelectorAll('.side-form');
  // modifyig the dom
  M.Sidenav.init(menus, {edge: 'right'});
  M.Sidenav.init(forms, {edge: 'left'});
});