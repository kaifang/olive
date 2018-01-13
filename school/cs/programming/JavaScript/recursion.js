const records = [
    { name: 'school', parent: null },
    { name: 'dept', parent: 'school' },
    { name: 'staff', parent: 'school' },
    { name: 'students', parent: 'school' },
    { name: 'TA', parent: 'instructor' },
    { name: 'social', parent: 'dept' },
    { name: 'cs', parent: 'dept' },
    { name: 'history', parent: 'dept' },
    { name: 'professor', parent: 'instructor' },
    { name: 'programming', parent: 'cs' },
    { name: 'instructor', parent: 'staff' },
    { name: 'admin', parent: 'staff' },
    { name: 'java', parent: 'programming' },
    { name: 'c', parent: 'programming' },
    { name: 'JavaScript', parent: 'programming' },
    { name: 'design', parent: 'cs' },
    { name: 'UX', parent: 'design' }
]

const arrangeCategories = (categories, parent = null) => {
    let result = {};

    //filter through the categories and get only those with the correct parent (which will be null on the first call)

    //After got the required categories, for each one of them we add them as a key on the results object  
    //and make a recursive call to find all of it’s child categories

    categories
        .filter(category => category.parent === parent)
        .forEach(category => {
            result[category.name] = arrangeCategories(categories, category.name)
        });

    return result;
}

const sorted = arrangeCategories(records);
console.log(sorted);
//The problem is that in some browsers, console.log does not really print the object. It only "connects" it to the console. 
console.log('--------------');
//The solution is to copy the content of the object, create a real clone
console.log(JSON.stringify(sorted));
console.log('--------------');
//beautify the content of the object by showing each element on a separate line and indenting the internal elements 4 spaces
console.log(JSON.stringify(sorted, null, 4));
