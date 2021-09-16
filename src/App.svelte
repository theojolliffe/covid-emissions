<script>
	import UInputs from './userInputs.json';  
	import vehicleLU from './vehicalLookup.json';  
	import RangeSlider from "svelte-range-slider-pips";
	import carTypeLookup from './carTypeLookup.json'
	import homeFuelConv from './homeFuelConv.json'
	import sharePic from '../assets/Car-share_64x64px.svg'
	import CO2ePic from '../assets/C02e_64x64px_NEW.svg'
	import moneyPic from '../assets/Money_64x64px.svg'
	import commutePic from '../assets/Commute_64x64px.svg'
	import tempPic from '../assets/Temperature_64x64px.svg'
	import tvPic from '../assets/TV_64x64px_.svg'
	import treePic2 from '../assets/tree_64x64px.svg'
	import WFHPic from '../assets/WFH_64x64px.svg'
	import elecPic from '../assets/Electricity_64x64px.svg'
	import { slide } from "svelte/transition";
	let isOpen = false
	const toggle = () => isOpen = !isOpen
	let isOpen2 = false
	const toggle2 = () => isOpen2 = !isOpen2
	function searchPC(pCode) {
		let url = "https://epc.opendatacommunities.org/api/v1/domestic/search?postcode=" + pCode.replace(/\s/g, '')
		fetch(url, { 
			method: 'get', 
			headers: new Headers({
				"Authorization": "Basic dGhlb2pvbGxpZmZlQGdtYWlsLmNvbTpjOTFlMWEzMzRjNTk4NDg0MTlmYTdjYTkwM2I5ZTdkOGQxMjJiMWU3",
				"Accept": "application/json",
			}),
		})
		.then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw new Error('Something went wrong');
		}
		})
		.then(data => {
			loadEr = false;
			epcData = data.rows
			searched = true;
		})
		.catch((error) => {
			loadEr = true
			console.log(error)
		});
  	}
	let manualVeh;
	let selectAd;
	let epcData;
	let postCode = '';
	let input = UInputs.results;
	let share = 0;
	let share2 = 1;
	let hoursHeated = [5];
	let wfhDpW = 1;
	let wfhDays=1;
	let limit = null
	let commMethod = false;
	let usage = false;
	let searched = false;
	let addressSelected = false;
	let loadEr = false;
	let comLU = {Walk: 1.8, Cycle: 6.8, Bus: 12.7, Train: 47, 'London Underground': 18.6, Motorbike: 18, Car: 20.9}
	let dietLU = {"High meat eater": 7.26, "Medium meat eater": 5.66, "Low meat eater": 4.67, "Pescatarian": 3.94, "Vegetarian": 3.85, "Vegan": 2.94}
	let comLength = [comLU[input[0].answerChoice]];
	$:km = 1.60934*comLength;
	let numLU = {0: 'zero', 0.5: '0.5', 1: 'one', 1.5: 'one and a half', 2: 'two', 2.5: 'two and a half', 3: 'three', 3.5: 'three and a half', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8:'eight', 9: 'nine', 10:10, 11:11,12:12,13:13}

	$:vehcLU = vehicleLU["Car"][input[1].answerChoice][input[2].answerChoice];
	$:vehConsump = (input[0].answerChoice=="Car")? vehcLU : vehicleLU[input[0].answerChoice];
	$:walkEm = dietLU[input[3].answerChoice]*(46*wfhDays*km*47)/2000
	$:cycleEm = dietLU[input[3].answerChoice]*(46*wfhDays*km*28)/2000
	$:totCommEm = (input[0].answerChoice=="Walk")? walkEm:(input[0].answerChoice=="Cycle")? cycleEm: Math.round(yearSaving*10)/10;

	function plural(share) { return share==1?"":"s";}
	function addMethod() { commMethod = !commMethod }
	function addUsage() { usage = !usage }
	let manualHeat = null;
	let manualHeatEnt = null;
	let manualAuto = 'auto'
	$: heatCost = (manualAuto=='manual')?manualHeatEnt: (addressSelected)?selectAd['heating-cost-current']:null;
	function searchManHeat(searchManHeat) {
		if (searchManHeat.slice(0, 1)=="£") {
			searchManHeat = searchManHeat.slice(1)
		}
		if (isNaN(searchManHeat)) {
			searchManHeat = null;	
		} else {
			manualHeatEnt = searchManHeat
			manualAuto='manual'
		}
	}
	let manualAutoType;
	function heatType() {
		manualAutoType='manual'  
	}
	let autoSelFuel
	$:selFuel = (manualAutoType=='manual')?input[4].answerChoice:(manualAutoType=='auto')?autoSelFuel:"Gas";
	function addressSel() {
		console.log("II")
		manualAutoType = 'auto'
		addressSelected = true;
		let gas = ["Gas: mains", "mains gas "]
		let elec = ["Electricity", "electricity"]
		let coal = ["Solid fuel: house coal", "house coal (not community)", "smokeless coal"]
		let oil = ["Oil", "oil"]
		let paraffin = ["Gas: bulk", "LPG (comm", "LPG (not ", "LPG - thi", "bottled L"]
		if (gas.includes(selectAd['main-fuel'].slice(0,10))) { autoSelFuel = "Gas" }
		else if (elec.includes(selectAd['main-fuel'].slice(0,11))) { autoSelFuel = "Electricity" }
		else if (coal.includes(selectAd['main-fuel'])) { autoSelFuel = "Coal and coke" }
		else if (oil.includes(selectAd['main-fuel'].slice(0,3))) { autoSelFuel = "Oil for central heating" }
		else if (paraffin.includes(selectAd['main-fuel'].slice(0,9))) { autoSelFuel = "Paraffin etc" }
		else { autoSelFuel = "No data" }
	}
	function searchManVeh(manualVeh) { vehConsump = manualVeh/1000 }
	function comLengthFunc() { comLength = [comLU[input[0].answerChoice]] }
	function enforceMinMax(v, min, max, topic) {
		if(v != ""){
			if(parseInt(v) < parseInt(min)){
				v = min;
				limit=topic
			} else if (parseInt(v) > parseInt(max)) {
				v = max;
				limit=topic
			} else {
				limit=null
			}
		}
		wfhDays = v;
	}
	$: calorieComm = km*((input[0].answerChoice=="Walk")?47:input[0].answerChoice=="Cycle"?28:null)
	$: caloriesYear = Math.round(46*wfhDays*calorieComm)
	$: yearSaving = (input[0].answerChoice=="Walk"|input[0].answerChoice=="Cycle")?(caloriesYear*dietLU[input[3].answerChoice]/2000):(46*wfhDays*(vehConsump*comLength))/(share+1);


</script>
<main>
	<div class="wrapper">
		<div class="col-wrap">
			<article class="col">
				<div class="section__content--markdown">
					<section>
						<header>
							<h3>The commute</h3>
						</header>
						<div style="display:grid !important">
							<form style="float:left">
								<p style="float:left; margin: 0px 50px 0px 0px;">How do you travel to work?</p>
								<select class="addressSelect" id="select1" bind:value={input[0].answerChoice} on:change={comLengthFunc}>
									{#each input[0].answers as question}
										<option selected={question.selected} value={question.text}>
											{question.text}
										</option>
									{/each}
								</select>
								{#if input[0].answerChoice=="Car"}
									<p style="float:left; margin: 0px 50px 0px 0px;">What kind of car do you drive?</p>
									<select class="addressSelect" id="select2" bind:value={input[1].answerChoice}>
										{#each input[1].answers as question}
											<option selected={question.selected} value={question.text}>
												{question.text}
											</option>
										{/each}
									</select>
								{#if (input[1].answerChoice!="Not sure")}
									<p style="display: inline-block; width: 100%;">For example, <i>{carTypeLookup[input[1].answerChoice][0]}</i> or <i>{carTypeLookup[input[1].answerChoice][1]}</i></p>
								{/if}
									<p style="float:left; margin: 0px 50px 0px 0px;">What's the fuel type?</p>
									<select class="addressSelect" id="select3" bind:value={input[2].answerChoice}>
										{#each input[2].answers[input[1].answerChoice] as question}
											<option selected={question.selected} value={question.text}>
												{question.text}
											</option>
										{/each}
									</select>
								{/if}
							</form>
						</div>
						{#if (input[0].answerChoice=="Car")|(input[0].answerChoice=="Motorbike")}
							<button id="accord" on:click={toggle} aria-expanded={isOpen}><svg style="tran"  width="20" height="20" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7"></path></svg> {"Vehicle not listed? Manually enter your fuel consumption rate"}</button>
							{#if isOpen}
							<div transition:slide={{ duration: 300 }}>
								<div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 36px; padding: 20px;"><p>If your vehicle type isn't listed you can manually enter your vehicle's fuel consumption rate.</p><p>The <a href="https://carfueldata.vehicle-certification-agency.gov.uk" target=”_blank”>Vehicle Certification Agency</a> has information about the fuel consumption rate of different vehicles.</p><button id="cavBut" on:click={addMethod}>Enter your vehicle's fuel consumption rate</button>
									{#if commMethod}
										<div class="input-group">
											<label class="visuallyhidden" for="fuelInput">Enter your vehicle's fuel consumption rate</label>
											<input class="typedInput" id="fuelInput" bind:value={manualVeh} placeholder="Grams of CO2e per mile">
											<button id="cavBut" on:click={searchManVeh(manualVeh)}>
												Enter
											</button>
										</div>
									{/if}
								</div>
							</div>
							{/if}
						{/if}
						<div class="grid-cont">
							<div class="grid-box" aria-live="assertive">
								<div style="width:80px">
									{@html CO2ePic}
								</div>
								<p class="pbox">
									{#if input[0].answerChoice=="Walk"}
										Walking to work emits no greenhouse gas, although GHG is emitted producing the food needed for the calories to walk.
									{:else if input[0].answerChoice=="Cycle"}
										Cycling to work emits no greenhouse gas, although bike manufacturing produces some greenhouse gas, as does producing the food needed for energy to cycle.
									{:else if input[0].answerChoice=="Bus"}
										For each passenger per mile, a bus emits about <strong class="strongblue">164 grams of CO2e</strong>
									{:else if input[0].answerChoice=="Train" }
										For each passenger per mile, a train emits about <strong class="strongblue">57 grams of CO2e</strong>
									{:else if input[0].answerChoice=="London Underground" }
										For each passenger per mile, the tube emits about <strong class="strongblue">45 grams of CO2e</strong>
									{:else if input[0].answerChoice=="Motorbike" }
										For each miles, a motorbike to work emits about <strong class="strongblue">182 grams of CO2e</strong>
									{:else if input[0].answerChoice=="Car"}
										Per mile, this vehicle emits approximately
										<strong class="strongblue">{Math.round(vehcLU*1000)} grams of CO2e</strong>
									{/if}
								</p>
							</div>
							<br class="box-break">
							<div class="grid-box" aria-live="assertive">
								<div style="width:80px">
									{@html commutePic}
								</div>
								<p class="pbox">
									{#if input[0].answerChoice=="Walk"}
											According to the National Travel Survey, for those who walk to work the average daily round commute is <strong class="strongblue">1.8 miles</strong>
									{:else if input[0].answerChoice=="Cycle"}
										According to the National Travel Survey, for those who cycle to work the average daily round commute is <strong class="strongblue">6.8 miles</strong>
									{:else if input[0].answerChoice=="Bus"}
										According to the National Travel Survey, for those who take the bus to work the average daily round commute is <strong class="strongblue">12.7 miles</strong>
									{:else if input[0].answerChoice=="Train" }
										According to the National Travel Survey, for those who take the train to work the average daily round commute is <strong class="strongblue">47 miles</strong>
									{:else if input[0].answerChoice=="London Underground" }
										According to the National Travel Survey, for those who take the London Underground to work the average daily round commute is <strong class="strongblue">18.6 miles</strong>
									{:else if input[0].answerChoice=="Motorbike" }
										According to the National Travel Survey, for those who ride a motorbike to work the average daily round motorbike is <strong class="strongblue">18 miles</strong>
									{:else if input[0].answerChoice=="Car" }
										According to the National Travel Survey, the average daily round car commute is <strong class="strongblue">20.9 miles</strong>
									{/if}
								</p>
							</div>
						</div>

						{#if input[0].answerChoice=="Bus"}
							<p>The average round commute on a London bus is <strong>9.6 miles</strong></p>
						{/if}

						{#if !((input[0].answerChoice=="Walk")|(input[0].answerChoice=="Cycle"))}
							<p>These figures are calculated using the <a href="https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2021" target=”_blank”>Department for Business, Energy and Industrial Strategy's conversion factors</a>.</p>
						{:else}
							<p>For some, working from home will not result in the consumption of less calories and will therefore not represent a reduction in dietary emissions.</p>
						{/if}
						{#if input[2].answerChoice=="Electric Vehicle"}
							<p>Although electric vehicles do not directly emit any greenhouse gas, the electricity they run on has an associated carbon cost.</p>
						{/if}
						<p><strong>How far is your daily round commute?</strong></p>
						<div id="slide-cont">
							<RangeSlider bind:values={comLength} min=0 max={(input[0].answerChoice=="Cycle")?40:(input[0].answerChoice=="Walk")?20:200} float suffix=" miles" step={0.1} springValues={{ stiffness: 0.3, damping: 0.7 }}/>
						</div>
						{#if input[0].answerChoice=="Car"}
							<p style="float:left; margin: 0px 50px 0px 0px;">On average, how many others do you commute with?</p>
							<div class="blockFlex">
								<div class="input-group">
									<label class="visuallyhidden" for="shareInput">Enter the number of people you share your commute with</label>
									<input style="width: 65px;" id="shareInput" type=number step="0.5" min=0 max=4 bind:value={share}>
								</div>
							</div>
						{/if}
						<p style="float:left; margin: 0px 50px 0px 0px;">How many days will you work from home each week?</p>
						<div class="blockFlex">
							<div class="input-group">
								<label class="visuallyhidden" for="wfhDpW">Enter the amount of days you will work from home each week</label>
								<input id="wfhDpW" type=number step="1" min=0 max=5 bind:value={wfhDpW} on:input={enforceMinMax(wfhDpW, 0, 5, 'wfhDays')} >
							</div>
						</div>
						{#if limit=="wfhDays"}
							<div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 36px; padding: 20px;">
								Please enter a value between 0 and 5.
							</div>
						{/if}

						<div class="grid-cont">
							<div class="grid-box" aria-live="assertive">
								<div style="width:80px">
									{@html sharePic}
								</div>
								<p class="pbox">
									{#if input[0].answerChoice=="Walk"|input[0].answerChoice=="Cycle"}
										Depending on your speed and various metabolic factors, commuting <strong>{comLength} miles</strong> burns about <strong class="strongblue">{Math.round(calorieComm).toLocaleString()} calories</strong>
									{:else}
										Commuting <strong>{comLength} miles</strong>,
										{#if input[0].answerChoice=="Car"}
											{#if share==0}
												without sharing your journey,
											{:else}
												sharing your journey with {numLU[share]} other{plural(share)}, individually
											{/if}
										{/if}
										you emit approximately <strong class="strongblue">{Math.round((vehConsump*km)/(share+1)*10)/10} kg CO2e</strong>
									{/if}
								</p>
							</div>
							<br class="box-break">
							<div class="grid-box" aria-live="assertive">
								{#if input[0].answerChoice=="Walk"|input[0].answerChoice=="Cycle"}
									<div style="width:80px">
										{@html elecPic}
									</div>
									<p>
										Avoiding your commute <strong>{numLU[wfhDays]} day{plural(wfhDays)} per week</strong>, in a typical year of 46 working weeks you will need approximately <strong class="strongblue">{caloriesYear.toLocaleString()} fewer calories</strong>
									</p>
								{:else}
									<div style="width:80px">
										{@html CO2ePic}
									</div>
									<p class="pbox">
										Avoiding your commute <strong>{numLU[wfhDays]} day{plural(wfhDays)} per week</strong>, across a 46 working week year you will save <strong class="strongblue">{Math.round(yearSaving*10)/10} kg CO2e</strong>
									</p>
								{/if}
							</div>
						</div>

						{#if (input[0].answerChoice=="Walk" | input[0].answerChoice=="Cycle")}
							<p style="float:left; margin: 0px 50px 0px 0px;">How would you describe your diet?</p>
							<select class="addressSelect" id="select1" bind:value={input[3].answerChoice} on:change={comLengthFunc}>
							{#each input[3].answers as question}
								<option selected={question.selected} value={question.text}>
									{question.text}
								</option>
							{/each}
							</select>
							<p>
								On a {input[3].answerChoice.toLowerCase()} diet, about <strong>{Math.round((yearSaving)*10)/10} kg CO2e</strong> would be emitted during the production of {caloriesYear.toLocaleString()} calories worth of food.
							</p>
						{/if}

						<div aria-live="assertive">
							<div class="orange">
								<div class="icon" style="width:100px">
									{@html tvPic}
								</div>
								<div>
									<p style="margin-bottom:0px !important">
										<strong>{Math.round(yearSaving*10)/10} kg CO2e</strong> can produce about <strong>{Math.round((totCommEm/0.23314)*10)/10} KWh</strong> of electricity in the UK, enough to power 60 Watt TV for<strong class="strongorange">{Math.round(((totCommEm/0.23314)/0.06)/168)} weeks</strong>
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
				<br>
				<br>
		<div class="section__content--markdown">
			<section>
			  <h3>The remote workplace</h3>
			  <p>For some home workers, the emissions saved on commuting may be lost to heating their home while their usual place of work is run at reduced capacity.</p>
			  <p>The amount of time remote workers choose to heat their home will be crucial in determining their household emissions.</p>
			  <p><strong>How much CO2e is produced by your home's heating system?</strong></p>
				<div>
					<div class="input-group">
						<label class="visuallyhidden" for="postcodeInput">Enter a full English or Welsh postcode</label>
						<input id="postcodeInput" class="typedInput" bind:value={postCode} placeholder="Enter a postcode (England or Wales)">
						<button id="postcodeSearch" on:click={searchPC(postCode)}>
							Search
						</button>
					</div>
				</div>
				{#if loadEr}
					<div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 36px;">
						<p><strong>Please enter a full valid post code.</strong></p>
					</div>
				{/if}
				{#if searched}
					<form class="addressForm">
						<select class="addressSelect" id="select4" bind:value={selectAd} on:blur={addressSel} on:change={addressSel}>
							<option value="" disabled selected>
								Select an address
							</option>
							{#each epcData as epc}
								<option value={epc}>
									{epc.address}
								</option>
							{/each}
						</select>
					</form>
				{/if}


				<div aria-live="assertive">
					<button id="accord" on:click={toggle2} aria-expanded={isOpen2}><svg style="tran"  width="20" height="20" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7"></path></svg>Address not listed? Manually enter details about your heating</button>
					{#if isOpen2}
						<div transition:slide={{ duration: 300 }}>
							<div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 36px; padding: 20px;"><p>If there is no publicly avaiable data for your address consider looking at a nearby property of similar size.</p>
								<button id="cavBut" on:click={addUsage}>Or manually enter your heating costs</button>
								{#if usage}
									<div class="input-group">
										<label class="visuallyhidden" for="costOfHeat">Enter your average annual heating costs</label>
										<input id="costOfHeat" class="typedInput" bind:value={manualHeat} placeholder="Average annual cost of heating (GBP)">
										<button id="cavBut" on:click={searchManHeat(manualHeat)}>Search</button>
									</div>
									<p style="float:left; margin: 0px 50px 0px 0px;">How is your heat generated?</p>
									<select class="addressSelect" id="select1" bind:value={input[4].answerChoice} on:change={heatType}>
										{#each input[4].answers as question}
											<option selected={question.selected} value={question.text}>
												{homeFuelConv[question.text][0]}
											</option>
										{/each}
									</select>
								{/if}
							</div>
						</div>
					{/if}
					{#if addressSelected}
						<div class="grey-box">
							<div class="icon" style="width:100px; margin-right: 10px;">
								{@html WFHPic}
							</div>
							<div>
								<p style="margin-bottom:0px !important">
									This <strong>{selectAd['total-floor-area']} m<sup>2</sup></strong> {selectAd['property-type'].toLowerCase()} has <strong>{numLU[selectAd['number-heated-rooms']]} heated rooms</strong> and is <strong>heated using {homeFuelConv[selFuel][0].toLowerCase()}</strong>, according to <a href="https://epc.opendatacommunities.org/" target=”_blank”>Energy Performance of Buildings data</a>
								</p>
							</div>
						</div>
						<br>
					{/if}
				{#if addressSelected | (manualHeatEnt>0)}
					<div class="grid-cont">
						<div class="grid-box" aria-live="assertive">
							<div style="width:90px">
								{@html moneyPic}
							</div>
							<p class="pbox">
								Based on the Standard Assessment Procedure's (SAP) estimate of 2,618 heating hours per year at about 21°C, heating this property costs approximately <strong class="strongblue">£{heatCost} per year</strong>
							</p>
						</div>
						<br class="box-break">
						<div class="grid-box" aria-live="assertive">
							<div style="width:90px">
								{@html CO2ePic}
							</div>
							<p class="pbox">
								Based on DEFRA's conversion factors, the property's heating system emits about {Math.round(heatCost*homeFuelConv[selFuel][1]).toLocaleString()} kg CO2e each year. <strong>For each hour</strong> the heating is on, this is about <strong class="strongblue">{Math.round(1000*(heatCost*homeFuelConv[selFuel][1])/2618)} grams of CO2e</strong>
							</p>
						</div>
					</div>
				{:else}
					<div class="grey-box" style="display: grid !important;grid-template-columns: auto auto;gap: 2%;padding: 20px;">
						<div style="width:100px; margin-right: 10px;">
							{@html CO2ePic}
						</div>
						<div>
							<p style="margin-bottom:0px !important">
								The average UK home emits about 2,349 kg CO2e on heating each year. <strong>For each hour</strong> the heating is switched on, this is approximately <strong class="strongblue">897 grams of CO2e</strong> 
							</p>
						</div>
					</div>
					<br>
				{/if}
			</div>

			<p style="float:left; margin: 0px 50px 0px 0px;">How many others do you ussually work from home with?</p>
			<div class="blockFlex">
				<div class="input-group">
					<label class="visuallyhidden" for="shareInput">Enter the number of people you share your home with during the day</label>
					<input style="width: 65px;" id="shareInput" type=number step="0.5" min=0 max=12 bind:value={share2}>
				</div>
			</div>


			<p><strong>How many extra hours will you heat your house while working from home?</strong></p>
			<div id="slide-cont">
				<RangeSlider bind:values={hoursHeated} min=0 max={24} float suffix=" hours per day" step={0.5} springValues={{ stiffness: 0.3, damping: 0.9 }}/>
			</div>

			{#if addressSelected | (manualHeatEnt>0)}

				<p>
					Heating your home for an additional <strong>{hoursHeated} hour{plural(hoursHeated)}</strong> will emit an extra <strong>{Math.round(((hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)*10)/10} kg CO2e per home working day</strong> during the heating season.
				</p>

				<div class="grid-cont">

					<div class="grid-box" aria-live="assertive">
						<div style="width:90px">
							{@html tempPic}
						</div>
						<p class="pbox">
							Considering SAP's heating season of 34 weeks, working from home {numLU[wfhDays]} day{plural(wfhDays)} per week, for each person your heating system would emit an additional <strong class="strongblue">{Math.round((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618))/(share2+1))} kg CO2e per year</strong>
						</p>
					</div>

					<br class="box-break">

					<div class="grid-box" aria-live="assertive">
						<div style="width:90px">
							{@html CO2ePic}
						</div>
						<p class="pbox">
							Accounting for the emissions saved on your commute minus the additional emissions from heating your home, you will <strong class="strongblue">{((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm)>0?"emit an extra":"save about"} {Math.round(Math.abs((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm))} kg CO2e per year</strong>
						</p>
					</div>
				</div>

				<div aria-live="assertive">
					<div class = "green">
						<div class="icon" style="width:100px; padding-top: 15px;
						margin-left: -10px;
						margin-right: 10px;">
							{@html treePic2}
						</div>
						<div>
							<p style="margin-bottom: 0 !important;">A mature tree can absorb around 22 kg CO2 per year. Therefore, <strong>{((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm)>0?"your extra":"your saved"} emissions</strong> would equate to the carbon capture of about <strong class="stronggreen">{
							((Math.abs((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm))/22).toFixed(0)
							} trees</strong>
							</p>
						</div>
					</div>
				</div>

			{:else}
				<p>
					Heating the average home for an additional <strong>{hoursHeated} hour{plural(hoursHeated)}</strong> will emit an extra <strong>{Math.round(((hoursHeated*897)/1000)*10)/10} kg CO2e per home working day</strong> during the heating season.
				</p>


				<div class="grid-cont">

					<div class="grid-box" aria-live="assertive">

						<div style="width:90px">
							{@html tempPic}
						</div>
						<p class="pbox">
							Considering SAP's heating season of 34 weeks, working from home {numLU[wfhDays]} day{plural(wfhDays)} per week, an average heating system would emit an additional <strong class="strongblue">{Math.round((((34*wfhDays*hoursHeated*897)/1000)/(share2+1))*10)/10} kg CO2e per year for each person</strong>
						</p>

					</div>

					<br class="box-break">

					<div class="grid-box" aria-live="assertive">

						<div style="width:90px">
							{@html CO2ePic}
						</div>
						<p class="pbox">
							Accounting for the emissions saved on your commute minus the additional emissions from heating your home, you will <strong class="strongblue">{((((34*wfhDays*hoursHeated*897)/1000)/(share2+1))-totCommEm)>0?"emit an extra":"save about"} {Math.round(Math.abs((((34*wfhDays*hoursHeated*897)/1000)/(share2+1))-totCommEm))} kg CO2e per year</strong>

						</p>

					</div>

				</div>

				<div aria-live="assertive">
					<div class = "green">
						<div class="icon" style="width:100px; padding-top: 15px;
						margin-left: -10px;
						margin-right: 10px;">
							{@html treePic2}
						</div>
						<div>
							<p style="margin-bottom: 0 !important;">A mature tree can absorb around 22 kg CO2 per year. Therefore, <strong>{((((34*wfhDays*hoursHeated*897)/1000)/(share2+1))-totCommEm)>0?"your extra":"your saved"} emissions</strong> would equate to the carbon capture of about <strong class="stronggreen">{((Math.abs((((34*wfhDays*hoursHeated*897)/1000)/(share2+1))-totCommEm))/22).toFixed(0)} trees</strong></p>
						</div>
					</div>
				</div>
			{/if}
			</section>
		  </div>
		  <br>
		  <div class="section__content--markdown">
			<section>
				<div class="grey-box" style="display: grid !important;grid-template-columns: auto auto;gap: 2%;padding: 20px;">
					<div>
						<p style="margin-bottom: 0px !important;margin-top: 10px;margin-left: 15px;">This makes up about <strong style="color: #206095; font-size: xx-large;padding: 3px;">{Math.round((Math.abs((((34*wfhDays*hoursHeated*897)/1000)/(share2+1))-totCommEm)/12700)*100*10)/10}%</strong> of the total emissions of the average person in the UK</p>
					</div>
					<div style="width:100px; margin-right: 10px;">
						{@html CO2ePic}
					</div>
				</div>
<br>
<br>
			</section>
		  </div>
		</article> 
	  </div>
	</div>
  </main>

  <style>
	* {
	box-sizing: border-box;
	scroll-behavior: auto !important;
  }
  body {
	  font-family: "Open Sans",Helvetica,Arial,sans-serif;
	  font-size: inherit;
	  font-weight: 400;
	  line-height: 24px;
	  color: #323132;
	  -webkit-font-smoothing: antialiased;
  }
  main {
	  display: block;
	  font-family: "Open Sans",Helvetica,Arial,sans-serif !important;
  }
  article {
	  display: block;
  }
  .col {
	overflow: visible;
	margin-left: 0 !important;
	margin-top: 0 !important;
	width: 640px;
	margin: 0;
	float: left;
  }
  section {
	  display: block;
  }
  .section__content--markdown {
	  overflow: visible;
	  clear: both;
	  position: relative;
  }
  header {
	  display: block;
  }
  h2 {
	  font-size: 30px;
	  margin: 32px 0 32px 0;
	  padding: 24px 0 0 0;
	  font-weight: bold;
	  line-height: 40px;
  }
  h3 {
	  font-size: 24px;
	  margin: 0 0 16px 0;
	  padding: 0 0 0 0;
	  font-weight: bold;
	  line-height: 32px;
  }
  p {
	  font-size: 18px;
	  font-weight: 400;
	  line-height: 32px;
	  margin: 0 0 24px 0;
	  padding: 0;
	  margin-bottom: 24px !important;
  }
  .chart {
		  height: 250px;
		  width: 500px;
		  margin-right: auto;
		  margin-left: auto;
		  margin-bottom:  20px;
	  }
  select {
	border-width: inherit;
	border-bottom-width: thin;
	padding: 0;
    line-height: inherit;
    color: inherit;
    font-family: inherit;
    font-size: 100%;
  }
  .slider {
	-webkit-appearance: none;
	width: 100%;
	height: 15px;
	border-radius: 5px;
	background: #d3d3d3;
	outline: none;
	opacity: 0.7;
	-webkit-transition: .2s;
	transition: opacity .2s;
  }
  .slider:hover {
	opacity: 1;
  }
  .slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #26a0cc;
	cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #26a0cc;
	cursor: pointer;
  }
  input[type="number"] {
	  text-align: center;
	  padding-left: 2px;
	  border-width: inherit;
	  border-bottom-width: thin;
	  border-color: #26a0cc;
      padding: 6px 12px;
      font-size: 16px;
      line-height: 1.42857143;
      color: #206095;
      background-color: #fff;
      background-image: none;
      border: 2px solid #1b5f97;
      border-radius: 25px;
      transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
      margin-bottom: 24px;
  }
  #slide-cont {
    margin: 34px 0 24px 0;  
}
  #span-cont {
	margin: 0 0 24px 0;
	display: inline-block;
  }
  input:focus {
    box-shadow: 0 0 0 3pt #fbdd02;
    outline: none;
  }
  select:focus {
    box-shadow: 0 0 0 3pt #fbdd02;
    outline: none;
  }
  button:hover {
    outline: none;
    background-color: #cecece !important;
  }
  button:active {
    outline: none;
    background-color: #a3a3a3 !important;
  }
  #accord:hover {
    outline: none;
    background-color: white !important;
	cursor: pointer;
  }
  #accord:active {
    outline: none;
    background-color: white !important;
	cursor: pointer;
  }
  .typedInput {
	text-transform: uppercase;
	height: 40px;
	width: 60%;
	padding: 6px 12px;
	font-size: 16px;
	line-height: 1.42857143;
	color: #206095;
	background-color: #fff;
	background-image: none;
	border: 2px solid #1b5f97;
	border-radius: 25px;
	transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
	margin-bottom: 24px;
	margin-top: 12px;
  }
  input {
	  -webkit-writing-mode: horizontal-tb !important;
	  text-rendering: auto;
	  letter-spacing: normal;
	  word-spacing: normal;
	  text-indent: 0px;
	  text-shadow: none;
	  display: inline-block;
	  text-align: start;
	  appearance: auto;
	  -webkit-rtl-ordering: logical;
	  cursor: text;
	  padding: 0;
    	line-height: inherit;
    	color: inherit;
    font-family: inherit;
    font-size: 100%;
	}
	::-webkit-input-placeholder {
	 text-transform: initial;
  }
  


  :-moz-placeholder { 
	text-transform: initial;
 }
 
 ::-moz-placeholder {  
	text-transform: initial;
 }
 
 :-ms-input-placeholder { 
	text-transform: initial;
 }
 #postcodeSearch {
	 color: #206095 !important;
	 border-radius: 25px;
	 padding: 8px 22px;
	 border: 2px solid #1b5f97;
	 background-color: #e9e9e9;
	 box-shadow: 1px 1px 2px 0px rgb(6 12 55 / 34%); 

 }
 .addressSelect {
	 width: 100%;
	 border: none;
	 height: 40px;
	 width: fit-content;
	 padding: 6px 12px;
	 font-size: 16px;
	 line-height: 1.42857143;
	 color: #206095;
	 background-color: #fff;
	 background-image: none;
	 border: 2px solid #1b5f97;
	 border-radius: 25px;
	 transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
	 position: relative;
	 margin-bottom: 24px;
 }
 .inputWrap {
   height: 40px;
   width: fit-content;
   padding: 6px 12px;
   font-size: 16px;
   line-height: 1.42857143;
   color: #206095;
   background-color: #fff;
   background-image: none;
   border: 2px solid #1b5f97;
   border-radius: 25px;
   transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
   position: relative;
   margin-bottom: 24px;
 }
 .visuallyhidden {
   position: absolute;
   width: 1px;
   height: 1px;
   margin: -1px;
   padding: 0;
   overflow: hidden;
   clip: rect(0,0,0,0);
   border: 0;
}
 #cavBut {
	 color: #206095 !important;
	 border-radius: 25px;
	 padding: 8px 22px;
	 border: 2px solid #1b5f97;
	 background-color: #e9e9e9;
	 box-shadow: 1px 1px 2px 0px rgb(6 12 55 / 34%);
 }

 .green { 
	 background-color: #E7F2EC; 
	 border-radius: 5px; 
	 padding: 20px; 
	 font-size: xx-large;
	 display: grid !important;
	 grid-template-columns: auto auto;
	 gap: 2%;
	}
.orange { 
	 background-color: #FFF1E9; 
	 border-radius: 5px; 
	 padding: 20px; 
	 font-size: xx-large;
	 display: grid !important;
	 grid-template-columns: auto auto;
	 gap: 2%;
	}

 button {
   font-family: inherit;
   font-size: 100%;
 }
 a {
   text-decoration: underline;
   font-size: 18px;
   font-weight: 400;
   line-height: 32px;
   color: #206095;
   word-wrap: break-word;
}
.blockFlex {
   display: flex;
}
@font-face{font-family:'Open Sans';src:url("https://cdn.ons.gov.uk/assets/fonts/open-sans-regular/OpenSans-Regular-webfont.eot?") format("eot"),url("https://cdn.ons.gov.uk/assets/fonts/open-sans-regular/OpenSans-Regular-webfont.woff2") format("woff2"),url("https://cdn.ons.gov.uk/assets/fonts/open-sans-regular/OpenSans-Regular-webfont.woff") format("woff"),url("https://cdn.ons.gov.uk/assets/fonts/open-sans-regular/OpenSans-Regular-webfont.ttf") format("truetype"),url("https://cdn.ons.gov.uk/assets/fonts/open-sans-regular/OpenSans-Regular-webfont.svg") format("svg");font-weight:400}@font-face{font-family:'Open Sans';src:url("https://cdn.ons.gov.uk/assets/fonts/open-sans-bold/OpenSans-Bold-webfont.eot?") format("eot"),url("https://cdn.ons.gov.uk/assets/fonts/open-sans-bold/OpenSans-Bold-webfont.woff2") format("woff2"),url("https://cdn.ons.gov.uk/assets/fonts/open-sans-bold/OpenSans-Bold-webfont.woff") format("woff"),url("https://cdn.ons.gov.uk/assets/fonts/open-sans-bold/OpenSans-Bold-webfont.ttf") format("truetype"),url("https://cdn.ons.gov.uk/assets/fonts/open-sans-bold/OpenSans-Bold-webfont.svg") format("svg");font-weight:700}


svg { transition: transform 0.2s ease-in;
}

[aria-expanded=true] svg { transform: rotate(0.25turn); }

#accord {
	text-decoration: underline;
	font-size: 18px;
	font-weight: 400;
	line-height: 32px;
	color: #206095;
	word-wrap: break-word;
	background-color: white;
    border: none;
	text-align: left;
}
.grid-cont {
	display: grid;
	grid-template-columns: 49% 49%;
	gap: 2%;
	margin-bottom: 24px;
}
.grid-box {
    background-color: #F5F5F6;
    padding: 20px;
	border-radius: 5px;
}
.grey-box {
    background-color: #F5F5F6;
    padding: 20px;
	border-radius: 5px;
}
.strongblue {
	font-size: xx-large;
    display: block;
    color: #206095;
	margin-top: 12px;
	line-height: 1.4;
}
.strongorange {
	font-size: xx-large;
    display: block;
    color: #FE781F;
	margin-top: 12px;
}

.stronggreen {
	font-size: xx-large;
    display: block;
    color: #0F8243;
	margin-top: 12px;
}
.pbox {
	margin-bottom: 0 !important;
}
.col-wrap {
	/* delete before florence */
 	margin-left: 20% !important;
}
.box-break {
	display: none
}
.icon {
	float:left
}
@media (max-width: 767px) {
	.icon {
		float: none;
	}
	.orange {
		display: block !important;
	}
	.green {
		display: block !important;
	}
	.box-break {
		display: block
	}
	.grid-cont {
		display: block;
	}
	.section__content--markdown {
	  padding: 0;
	}
	.typedInput {
		font-size: 14px !important;
	}
	p, button, a {
		font-size: 16px !important;
	}
	h1 {
		font-size: 32px;
	}
	h2 {
		font-size: 24px;
    	margin: 24px 0 16px 0;
    	line-height: 32px;
	}
	h3 {
		font-size: 18px;
    	line-height: 24px;
    	margin: 24px 0 16px 0;
	}
	h4 {
		font-size: 16px;
		line-height: 24px;
		margin: 16px 0 16px 0;
	}
	.col {
		width: 100%;
		margin-left: 0px !important;
	}
	.addressSelect {
		display: block;
	}
  }
  .blockFlex {
	  display: block;
  }
  @media (min-width: 768px) {
	.section__content--markdown {
	  margin-right: 48px;
	}
  }
  @media (min-width: 992px) {
	.section__content--markdown {
		margin-right: 32px;
	}
  }
  .wrapper {
	  width: 100%;
	  margin: 0 0;
	  padding: 0 16px;
	  font-family: "Open Sans",Helvetica,Arial,sans-serif !important;
  }
  @media (min-width: 768px) {
	.wrapper {
	  width: 752px;
	  padding: 0;
	}
  }
  @media (min-width: 992px) {
	.wrapper {
	  width: 944px;
	  padding: 0;
	}
  }
  .col-wrap {
	  width: 100%;
  }
  @media (min-width: 768px) {
	.col-wrap {
		width: 768px;
		/* margin-left: -8px; */
	}
  }
  @media (min-width: 992px) {
	.col-wrap {
		width: 960px;
		/* margin-left: -8px; */
	}
  } 

  </style>