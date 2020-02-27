<?php 
	require('connectdb.php');

	/*$items = [
		"Dragonclaw Hook",
		"Span of Black Nihility",
		"Cauldron of Xahryx",
		"Mace of the Chosen",
		"Leviathan Whale Blade",
		"Whalehook",
		"Mecha Boots of Travel Mk III",
		"The Lightning Orchid",
		"Muh Keen Gun",
		"Elixir of Dragon's Breath",
		"Hellborn Grasp",
		"Splattering Forcipule",
		"Geodesic Eidolon",
		"Gravelmaw",
		"Eternal Machine Head",
		"Fin King's Charm",
		"Rampant Outrage",
		"Kindred of the Iron Dragon",
		"Pale Mausoleum",
		"Severing Crest",
		"Lamb to the Slaughter",
		"Merry Wanderer,s Brush",
		"Yulsaria's Glacier",
		"Sylvan Cascade",
		"Fluttering Mortis",
		"Inverse Bayonet",
		"White Sentry",
		"Mania's Mask",
		"Crystal Dryad",
		"Blade of Tears",
		"Flourishing Lodestar",
		"Empyrean",
		"Swift Claw",
		"Soul Diffuser",
		"Genuine Winterblight",
		"Genuine Bloodfeather Wings",
		"Fluttering Staff",
		"Genuine Molten Claw",
		"Genuine The Barb of Skadi",
		"Genuine Hell's Usher",
		"Genuine Moon Griffon",
		"Genuine Skittering Desolation",
		"Genuine Claddish Cudgel",
		"Genuine Rapier of the Burning God Offhand",
		"Genuine Rapier of the Burning God",
		"Genuine Serrakura",
		"Genuine Eternal Radiance Blades",
		"The Barren Crown",
		"Iron Surge",
		"Shock of the Anvil",
		"Moonfall",
		"Almond the Frondillo",
		"World Chasm Artifact",
		"Arms of Desolation",
		"Jewel of Aeons",
		"Basher of Mage Skulls",
		"Offhand Basher of Mage Skulls",
		"Tormented Staff",
		"Resistive Pinfold",
		"Vigil Signet",
		"Rollermawster",
		"Pyrexaec Floe",
		"Demon Eater",
		"Golden Offhand Basher of Mage Skulls",
		"Sullen Harvest",
		"Shatterblast Crown",
		"Sullen Hollow",
		"Staff of Perplex",
		"Sylvan Vedette",
		"Silent Wake",
		"Latticean Shards",
		"Fiery Soul of the Slayer",
		"Golden Moonfall",
		"Frost Avalanche",
		"Swine of the Sunken Galley",
		"Focal Resonance",
		"Mace of Aeons",
		"Golden Shadow Masquerade",
		"Golden Basher of Mage Skulls",
		"Whisky the Stout Artifact",
		"Golden Ice Blossom",
		"Dark Artistry Pauldrons",
		"Blistering Shade",
		"Grasping Bludgeon",
		"Bladeform Legacy",
		"Codicil of the Veiled Ones",
		"Magus Accord",
		"Golden Mantle of Grim Facade",
		"Golden Full-Bore Bonanza",
		"Golden Scavenging Guttleslug",
		"Vigil Triumph",
		"Origins of Faith",
		"Golden Hydrakan Latch",
		"Manifold Paradox",
		"Golden Ripper's Reel",
		"Blades of Voth Domosh",
		"Cult of the Demon Trickster",
		"Feast of Abscession",
		"Crimson Progenitor's Bane",
		"Etienne's Revenge",
		"Golden Beetlejaws the Boxhound",
		"Hunter's Hoard",
		"Tempest Helm of the Thundergod",
		"Great Sage's Reckoning",
		"Flockheart's Gam"
	];*/
	$items = R::getAll('SELECT * FROM items ');
	//print_r( $items);
	for($i = 0;$i<=count($items);$i++){
		//if($i%10 == 1 && $i != 1)sleep(180);	
		//if( R::findOne('items','name = ?', [$items[$i]]))continue;	
		/*$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER => true,
		    CURLOPT_URL => 'http://steamcommunity.com/market/listings/570/'.rawurlencode($items[$i]).'/render?start=0&count=1&currency=1&format=json',
		    CURLOPT_USERAGENT => 'ahahahh',
		    CURLOPT_FOLLOWLOCATION => true
		));
		$code = json_decode(curl_exec($curl));
		curl_close($curl);*/


		$curl = curl_init();

		curl_setopt_array($curl, array(
			CURLOPT_RETURNTRANSFER => true,
		    CURLOPT_URL => 'http://steamcommunity.com/market/priceoverview/?appid=570&market_hash_name='.rawurlencode($items[$i]['name']).'&currency=1',
		    CURLOPT_USERAGENT => 'Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.7.62 Version/11.01',
		    CURLOPT_FOLLOWLOCATION => true
		));
		$res = json_decode(curl_exec($curl));
		curl_close($curl);
		if(!$res)sleep(200);
		if($res){
			echo 1;
			$item = R::findOne('items',"name = ?",[$items[$i]['name']]);
			$res->lowest_price = substr($res->lowest_price, 1);
			$res->median_price = substr($res->median_price, 1);
			$item->lowest_price = $res->lowest_price;
			$item->median_price = $res->median_price;
			$item->value = 0.85*intval($res->median_price) - intval($res->lowest_price);
			R::store($item);
			sleep(20);
		}
									

        if($i == count($items))$i = 1;


	}








?>