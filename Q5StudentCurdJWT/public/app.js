
let token = '';

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.token) {
        token = data.token;
        document.getElementById('login').style.display = 'none';
        document.getElementById('studentCrud').style.display = 'block';
        fetchStudents();
    }
}

async function logout() {
    token = '';
    document.getElementById('login').style.display = 'block';
    document.getElementById('studentCrud').style.display = 'none';
}

async function fetchStudents() {
    const res = await fetch('http://localhost:3000/students', {
        headers: { Authorization: token },
    });
    const students = await res.json();
    const studentsDiv = document.getElementById('students');
    studentsDiv.innerHTML = students.map(s => `<div>${s.name} - ${s.age} - ${s.grade}</div>`).join('');
}

async function addStudent() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;

    await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
        body: JSON.stringify({ name, age, grade }),
    });
    fetchStudents();
}
