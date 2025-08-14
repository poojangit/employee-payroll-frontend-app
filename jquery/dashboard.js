$(document).ready(function () {

  function createTableRow(empData) {
    let count = 0;
    let tableRows = '';
    $.each(empData, function (index, emp) {
      console.log(emp);
      tableRows += `
        <tr>
          <td class="img-th"><img src="${emp.profileImg}" alt=""></td>
          <td class="name-th"><span>${emp.userName}</span></td>
          <td class="gender-th"><span>${emp.gender}</span></td>
          <td class="dept-th dept-fields">
            ${emp.departments.map(dep => `<a href="">${dep}</a>`).join(' ')}
          </td>
          <td class="sal-th"><span>${emp.salary}</span></td>
          <td class="date-th"><span>${emp.startDate}</span></td>
          <td class="action-th action-icon">
            <i class="fa-solid fa-trash-can" onclick="deleteEmp('${emp.userName}')"></i>
            <i class="fa-solid fa-pen" onclick="editEmp('${emp.userName}')"></i>
          </td>
        </tr>
      `;
      count++;
    });
    $('#emp-count').html(`( ${count} )`);
    return tableRows;
  }

  function loadEmployeeData() {
    let employees = JSON.parse(localStorage.getItem('users')) || [];
    $('tbody').html(createTableRow(employees));
  }

  window.deleteEmp = function (userName) {
    let employees = JSON.parse(localStorage.getItem('users')) || [];
    employees = employees.filter(emp => emp.userName !== userName);
    localStorage.setItem('users', JSON.stringify(employees));
    loadEmployeeData();
  }

  window.editEmp = function (userName) {
    let employees = JSON.parse(localStorage.getItem('users')) || [];
    let employee = employees.find(emp => emp.userName === userName);
    localStorage.setItem('editEmp', JSON.stringify(employee));
    window.location.href = '/pages/emp-register-form.html';
  }

  loadEmployeeData();

  let employees = JSON.parse(localStorage.getItem('users')) || [];

  $('#searchInput').on('keyup', function () {
    let searchValue = $(this).val();
    let searchedEmp = employees.filter(emp => emp.userName.includes(searchValue));
    $('tbody').html(createTableRow(searchedEmp));
  });

  $('#add-user-btn-id').on('click', function () {
    localStorage.removeItem('editEmp');
    window.open('/pages/emp-register-form.html');
  });

});
