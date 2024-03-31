#! /usr/bin/env node

import inquirer  from "inquirer";
import chalk from "chalk";


async function animateText(text: string) {
    for (let char of text) {
      process.stdout.write(char);
      // Add a delay of 30 milliseconds between each character
      await new Promise((resolve) => setTimeout(resolve, 1));
    }
}

async function exitAnimate(text: string) {
    for (let char of text) {
      process.stdout.write(char);
      // Add a delay of 30 milliseconds between each character
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
}
let todos :string[] = ["Huzaifa","Maked this Todo app","With Typescript"];

async function main() {
    
    
    let todoList = await inquirer.prompt([{
        name: "todo",
        type: "list",
        message: await animateText(chalk.green.bold.underline("\n\n\tMake your todo list using these choices\n\n")),
        choices: ["add todos",
                  "delete todos",
                  "View your list",
                  "\"Exit\""
                ]
    }])
    
    if(todoList.todo === "add todos"){
        const addTodo = await inquirer.prompt([
            {
                name: "todo_adding",
                type: "input",
                message: await animateText(chalk.yellow.bold.underline("\nPlease add your todo item here:  \n"))
            }
        ])
        
        todos.push(addTodo.todo_adding)
        console.log(chalk.gray("--------------------------------------------------------------"))
        await animateText(chalk.green.bold.italic(`To added Successfully!:${addTodo.todo_adding}`));
        await animateText(chalk.gray("\n--------------------------------------------------------------"))
        
        main();
    }

//______________________________________________________________________________
//______________________________________________________________________________
    
    // List viewing Section
    
    else if (todoList.todo === "View your list") {
        await animateText(chalk.gray("\n--------------------------------------------------------------"));
        await animateText(chalk.redBright.underline("\nYour Todos:-\n"))
        todos.forEach((todo, index) => console.log(`\t|${index + 1}. ${todo}|`));
        await animateText(chalk.gray("\n--------------------------------------------------------------"))
        
        main();
    }
        
//______________________________________________________________________________
//______________________________________________________________________________

    // Deleting Items
   else if(todoList.todo === "delete todos"){
    const delTodo = await inquirer.prompt([{
        name:"deleteTodo",
        type: "list",
        message: await animateText(chalk.red.bold.underline("\nchoose one todo you which want to delete.\n")),
        choices: todos
    }])
     
    const index = todos.indexOf(delTodo.deleteTodo)
    await animateText(chalk.gray("--------------------------------------------------------------\n"))
    if (index !== -1) {
        todos.splice(index, 1)
        await animateText(chalk.red.bold.italic(`\tTodo deleted Successfully: ${delTodo.deleteTodo}`));
    } else {
        console.log("Todo not found");
    }
    await animateText(chalk.gray("\n--------------------------------------------------------------"))


    main();

}
//____________________________________________________________________________
//____________________________________________________________________________

        // Exit Section.

        else if(todoList.todo === "\"Exit\""){
            const exit = await inquirer.prompt([{
                name: "ExitTodo",
                type: "confirm",
                message: await animateText(chalk.red.bold("\n\tDo you want to Exit\n"))
            }])
            if(exit.ExitTodo){
                await exitAnimate(chalk.bold.yellowBright.underline("\n\t\t\tExiting..."));
                console.log(chalk.bold.yellow.underline("\n\t\tThanks for Using my todo aap.\n"));
                
                return;
                
            }else{
                main();
            }
    
        }
    
    }
    
    
main();