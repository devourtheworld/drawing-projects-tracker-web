const storageKey = 'drawingProjects';

function saveProjectsToLocalStorage(projects) {
    localStorage.setItem(storageKey, JSON.stringify(projects));
}

function loadProjectsFromLocalStorage() {
    const projectsJSON = localStorage.getItem(storageKey);
    return projectsJSON ? JSON.parse(projectsJSON) : [];
}

function loadCustomJSONFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const projects = JSON.parse(event.target.result);
                saveProjectsToLocalStorage(projects);
                resolve(projects);
            } catch (error) {
                reject('Error parsing JSON file');
            }
        };
        reader.onerror = () => {
            reject('Error reading file');
        };
        reader.readAsText(file);
    });
}

function clearLocalStorage() {
    localStorage.removeItem(storageKey);
}

export { saveProjectsToLocalStorage, loadProjectsFromLocalStorage, loadCustomJSONFile, clearLocalStorage };