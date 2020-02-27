<?php 
  require ('connectdb.php');
  if(isset($_POST['submit'])){
    $user = R::findOne('users','username = ?', [$_POST['name']]);
    if($user){
      if(password_verify($_POST['password'], $user->password)){
        $_SESSION['user'] = $user;
        //echo 'Вы успешно зарегистрировались!Можете  ' . '<a href = "index.php">войти</a> ' . 'на сайт.';
        header('Location: /');
      }
      else{
        echo 'Неверный пароль';
      }
    }
    else{
      echo "такого пользователя не существует ";
    }
    
  }
  

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Authorization</title>
  <link href="./css/style.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>

  <a href="index.php"><-- На главную </a>
  <form  class= 'container' style="width: 30%" method="post">
    <h1>Авторизация</h1>
    <div class="form-group">
    <label for="exampleInputEmail1">Username</label>
    <input type="text" class="form-control" id="exampleInputusername1" name = 'name'>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" name="password">
  </div>
  
  <button type="submit" class="btn btn-primary container" name="submit">Войти</button>
</form>
</body>
</html>