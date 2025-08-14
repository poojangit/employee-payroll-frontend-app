$(document).ready(function () {

    // Populate Day dropdown
    for (let day = 1; day <= 31; day++) {
        $('#day').append(`<option value="${day}">${day}</option>`);
    }

    // Populate Month dropdown
    for (let month = 1; month <= 12; month++) {
        $('#month').append(`<option value="${month}">${month}</option>`);
    }

    // Populate Year dropdown
    const currentYear = new Date().getFullYear();
    const startYear = 2000;
    for (let year = startYear; year <= currentYear; year++) {
        $('#year').append(`<option value="${year}">${year}</option>`);
    }

    // Load edit data if available
    let editEmp = JSON.parse(localStorage.getItem('editEmp'));
    if (editEmp) {
        $('#username').val(editEmp.userName || '');
        $(`input[name="profile"][value="${editEmp.profileImg}"]`).prop('checked', true);
        $(`input[name="gender"][value="${editEmp.gender}"]`).prop('checked', true);

        if (Array.isArray(editEmp.departments)) {
            editEmp.departments.forEach(dep => {
                $(`input[name="department"][value="${dep}"]`).prop('checked', true);
            });
        }

        $('#salary').val(editEmp.salary || '');

        if (editEmp.startDate) {
            let [day, month, year] = editEmp.startDate.split('-');
            $('#day').val(day);
            $('#month').val(month);
            $('#year').val(year);
        }

        $('#notes').val(editEmp.notes || '');
    }

    // Form submit handler
    $('.payroll-form').on('submit', function (e) {
        e.preventDefault();

        let name = $('#username').val().trim();
        let profile = $('input[name="profile"]:checked').val();
        let gender = $('input[name="gender"]:checked').val();
        let departments = $('input[name="department"]:checked').map(function () { return $(this).val(); }).get();
        let salary = $('#salary').val();
        let day = $('#day').val();
        let month = $('#month').val();
        let year = $('#year').val();
        let startDate = `${day}-${month}-${year}`;
        let notes = $('#notes').val().trim();

        let employees = JSON.parse(localStorage.getItem('users')) || [];

        if (editEmp) {
            employees = employees.map(emp => emp.userName === editEmp.userName ? {
                userName: name,
                profileImg: profile,
                gender: gender,
                departments: departments,
                salary: salary,
                startDate: startDate,
                notes: notes
            } : emp);
            localStorage.removeItem('editEmp');
        } else {
            employees.push({
                userName: name,
                profileImg: profile,
                gender: gender,
                departments: departments,
                salary: salary,
                startDate: startDate,
                notes: notes
            });
        }

        localStorage.setItem('users', JSON.stringify(employees));
        alert('Data submitted successfully!');
        window.location.href = '/pages/emp-dashboard.html'
    });

    // Reset button
    $('#reset-btn').on('click', function () {
        $('.payroll-form')[0].reset();
    });

    // Cancel button
    $('#cancel-btn').on('click', function (e) {
        e.preventDefault();
        $('.payroll-form')[0].reset();
        window.location.href = '/pages/emp-dashboard.html';
    });
});