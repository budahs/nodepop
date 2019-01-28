# [NODEPOP]
To initializa the project:
```shell
npm install
```
## FRESH START DB SET
Verify the database connection in ./lib/mongooseConn.js
You can use the script to initializa databe with
```shell
npm run installDB
```
## Start
To run proyect use:
* Production ENV:
```shell
npm start
```
*Development ENV:
```shell
npm run dev
```
# [NODEPOP USAGE]
The API is available at the following address:
```shell
http://localhost:3001/apiv1/
```
## Available requests
### [Method DELETE]
To delete adds send id in URl as follows:
```shell
http://localhost:3001/apiv1/id
```
### [Method POST]
To create new item in database use method POST as follows:
```shell
http://localhost:3001/apiv1/
```
Required params :
```shell
nombre(String),precio(numeric),venta(Boolean)
```
### [Method GET]
[1] To get a specific item from database:
```shell
http://localhost:3001/apiv1/id
```
[2] To get multiple items:
```shell
http://localhost:3001/apiv1/
```
### [Available filters at GET]
> **price**
- ?price=-number : returns items with price below or equal to given number 
- ?price=number- : returns items with price above or equal to given number
- ?price=numberA-numberB : returns items within range of numberA and numberB
> **sort** (field)
- ?sort=givenField : returns values sorted by given field in ascendent order by default
- ?sort=givenField&desc=1 : sorts and inverts default order
> **start** (numeric)
- ?start=number : returns values starting from given number
> **limit** (numeric)
- ?limit=number : returns the number of items specified in given number
> **tags** (string)
- ?tags=tag1 tag2 tag3 : returns items which tags contain given tags separated by space
> **Sale** (boolean)
- ?sale=true : returns items on sale
- ?sale=false : returns items requested


