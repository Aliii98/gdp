<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;

class WebSocketController extends Controller implements MessageComponentInterface{
  private $connections = [];
  private $clients;
  private $command;
  private $con;
  private $fro;
  public function __construct() {
      $this->clients = new \SplObjectStorage;
  }
  public function onOpen(ConnectionInterface $conn)
  {
     // Store the new connection to send messages to later
     $this->clients->attach($conn);
     $this->con = "Hi";
     echo "New connection! ({$conn->resourceId})\n";
     $command = "null";
  }
  public function onMessage(ConnectionInterface $from, $msg) 
  {
    $this->fro = $from;
    echo "Received: $msg \n";
  }
  public function onClose(ConnectionInterface $conn)
  {
     // The connection is closed, remove from connection list
     $this->clients->detach($conn);
     echo "Connection {$conn->resourceId} has disconnected\n";

  }
  public function onError(ConnectionInterface $conn, \Exception $e)
  {
      echo "An error has occurred: {$e->getMessage()}\n";
      $conn->close();
  }

public function getStatus(){
  // $this->clients->current()->send("11111");
  // $this->con->send("22222");
  echo ($this->con);
  foreach ($this->clients as $client) {
        $client->send("hi");
    }
  }
}
