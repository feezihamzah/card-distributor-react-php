<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

function distributeCards($people) {
    if (!is_numeric($people) || $people <= 0 || $people != (int)$people) {
        echo json_encode(["error" => "Invalid input"]);
        return;
    }

    if ($people > 52) {
        echo json_encode(["error" => "Too many people. Max is 52"]);
        return;
    }

    $suits = ['S', 'H', 'D', 'C'];
    $values = range(1, 13);
    $deck = [];

    foreach ($suits as $suit) {
        foreach ($values as $val) {
            if ($val == 1) $value = 'A';
            elseif ($val == 10) $value = 'X';
            elseif ($val == 11) $value = 'J';
            elseif ($val == 12) $value = 'Q';
            elseif ($val == 13) $value = 'K';
            else $value = (string)$val;

            $deck[] = "$suit-$value";
        }
    }

    shuffle($deck);

    $hands = array_fill(0, $people, []);
    foreach ($deck as $i => $card) {
        $hands[$i % $people][] = $card;
    }

    echo json_encode(["hands" => $hands]);
}

if (isset($_GET['n'])) {
    distributeCards((int)$_GET['n']);
} else {
    echo json_encode(["error" => "No input provided"]);
}
?>
