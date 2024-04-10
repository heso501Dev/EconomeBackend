// income
select * from user:baher->has->transactions->contains->node where amount > 0 and is_goal is false;
// expense
select * from user:baher->has->transactions->contains->node where amount < 0 and is_goal is false;
// goal
select * from user:baher->has->transactions->contains->node where is_goal;
// manule filter
select * from user:baher->has->transactions->contains->node;


// create user set email = "baher@gmail.com",password= "sad",username= "baher";
BEGIN TRANSACTION;
LET  $p = create user content {"email" : "baher@g.com","password" :"sad","username":"baher"};
RETURN $p.id;
COMMIT TRANSACTION;
// select id from user where email = "baher@gmail.com"
//create node set amount = 100 , interval= "0d", name= "sad", startDate= "2010",total= 100
// RELATE user:wy8qerd4q586kq2583uj->wrote->node:
