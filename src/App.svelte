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

	let manualVeh;
	let selectAd;
	let input = UInputs.results;
	let share = 0;
	let share2 = 1;
	let hoursHeated = [5];
	let wfhDpW = 1;
	let wfhDays=1;
	let limit = null
	let commMethod = false;
	let addressSelected = false;
	let comLU = {Walk: 1.8, Cycle: 6.8, Bus: 12.7, Train: 47, 'London Underground': 18.6, Motorbike: 18, Car: 20.9}
	let dietLU = {"High meat eater": 7.26, "Medium meat eater": 5.66, "Low meat eater": 4.67, "Pescatarian": 3.94, "Vegetarian": 3.85, "Vegan": 2.94}
	let comLength = [comLU[input[0].answerChoice]];
	let kmConv =1.60934;
	let numLU = {0: 'zero', 0.5: '0.5', 1: 'one', 1.5: 'one and a half', 2: 'two', 2.5: 'two and a half', 3: 'three', 3.5: 'three and a half', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8:'eight', 9: 'nine', 10:10, 11:11,12:12,13:13}

	function plural(share) { return share==1?"":"s";}
	function addMethod() { commMethod = !commMethod }
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

	$:vehcLU = vehicleLU["Car"][input[1].answerChoice][input[2].answerChoice];
	$:vehConsump = (input[0].answerChoice=="Car")? vehcLU*kmConv : vehicleLU[input[0].answerChoice]*kmConv;
	$: calorieComm = comLength*((input[0].answerChoice=="Walk")?87.5:input[0].answerChoice=="Cycle"?44.3:null)
	$: caloriesYear = Math.round(46*wfhDays*calorieComm)
	$:walkEm = dietLU[input[3].answerChoice]*(46*wfhDays*comLength*87.5)/2000
	$:cycleEm = dietLU[input[3].answerChoice]*(46*wfhDays*comLength*44.3)/2000
	$: yearSaving = (input[0].answerChoice=="Walk"|input[0].answerChoice=="Cycle")?(caloriesYear*dietLU[input[3].answerChoice]/2000):(46*wfhDays*(vehConsump*comLength))/(share+1);
	$:totCommEm = (input[0].answerChoice=="Walk")? walkEm:(input[0].answerChoice=="Cycle")? cycleEm: Math.round(yearSaving*10)/10;


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
						<br>
						<div style="display:grid !important">
							<form style="float:left">
								<label>
								<p style="float:left; margin: 0px 50px 0px 0px;">How do you travel to work?</p>
								<select class="addressSelect" id="select1c" bind:value={input[0].answerChoice} on:change={comLengthFunc}>
									{#each input[0].answers as question}
										<option selected={question.selected} value={question.text}>
											{question.text}
										</option>
									{/each}
								</select>
								</label>
								{#if input[0].answerChoice=="Car"}
									<label>
									<p style="float:left; margin: 0px 50px 0px 0px;">What kind of car do you drive?</p>
									<select class="addressSelect" id="select2" bind:value={input[1].answerChoice}>
										{#each input[1].answers as question}
											<option selected={question.selected} value={question.text}>
												{question.text}
											</option>
										{/each}
									</select>
									</label>
								{#if (input[1].answerChoice!="Not sure")}
									<p style="display: inline-block; width: 100%;">For example, <i>{carTypeLookup[input[1].answerChoice][0]}</i> or <i>{carTypeLookup[input[1].answerChoice][1]}</i></p>
								{/if}
									<label>
									<p style="float:left; margin: 0px 50px 0px 0px;">What's the fuel type?</p>
									<select class="addressSelect" id="select3" bind:value={input[2].answerChoice}>
										{#each input[2].answers[input[1].answerChoice] as question}
											<option selected={question.selected} value={question.text}>
												{question.text}
											</option>
										{/each}
									</select>
									</label>
								{/if}
							</form>
						</div>
						<br>
						<br>
						<div class="grid-cont">
							<div class="grid-box" aria-live="assertive">
								<div style="width:80px">
									{@html CO2ePic}
								</div>
								<p class="pbox">
									{#if input[0].answerChoice=="Walk"}
										Walking to work emits no greenhouse gases, although GHG is emitted producing the food needed for the calories to walk.
									{:else if input[0].answerChoice=="Cycle"}
										Cycling to work emits no greenhouse gases, although bike manufacturing produces some greenhouse gases, as does producing the food needed for energy to cycle.
									{:else if input[0].answerChoice=="Bus"}
										For each passenger per mile, a bus emits about <strong class="strongblue">{Math.round(102*kmConv)} grams of CO2e</strong>
									{:else if input[0].answerChoice=="Train" }
										For each passenger per mile, a train emits about <strong class="strongblue">{Math.round(35*kmConv)} grams of CO2e</strong>
									{:else if input[0].answerChoice=="London Underground" }
										For each passenger per mile, the tube emits about <strong class="strongblue">{Math.round(28*kmConv)} grams of CO2e</strong>
									{:else if input[0].answerChoice=="Motorbike" }
										For each miles, a motorbike to work emits about <strong class="strongblue">{Math.round(116*kmConv)} grams of CO2e</strong>
									{:else if input[0].answerChoice=="Car"}
										Per mile, this vehicle emits approximately
										<strong class="strongblue">{Math.round(vehcLU*1000*kmConv)} grams of CO2e</strong>
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

							{#if !((input[0].answerChoice=="Car")|(input[0].answerChoice=="Motorbike"))}
							<p>
								Less use of public transport may not impact total UK emissions unless services are adapted to account for the fall in demand.
							</p>
							{/if}
							<p>These figures are calculated using the <a href="https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2021" target=”_blank”>Department for Business, Energy and Industrial Strategy's conversion factors</a>.</p>
						{:else}
							<p>Some people may offset commuting calories with increased exercise while working from home. Therefore working from home may not represent a reduction in dietary emissions.</p>
						{/if}
						{#if input[2].answerChoice=="Electric Vehicle"}
							<p>Although electric vehicles do not directly emit any greenhouse gases, the electricity they run on has an associated carbon cost.</p>
						{/if}
						<br>
						<p><strong>How far is your daily round commute?</strong></p>
						<div id="slide-cont">
							<RangeSlider bind:values={comLength} min=0 max={(input[0].answerChoice=="Cycle")?40:(input[0].answerChoice=="Walk")?20:200} float suffix=" miles" step={(input[0].answerChoice=="Cycle"|input[0].answerChoice=="Walk")?0.1:1} springValues={{ stiffness: 0.3, damping: 0.7 }}/>
						</div>
						<br>
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
						<br>
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
										By commuting <strong>{comLength} miles</strong>,
										{#if input[0].answerChoice=="Car"}
											{#if share==0}
												without sharing your journey,
											{:else}
												sharing your journey with {numLU[share]} other{plural(share)}, individually
											{/if}
										{/if}
										you emit approximately <strong class="strongblue">{Math.round((vehConsump*comLength)/(share+1)*10)/10} kg CO2 equivalent</strong>
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
										By avoiding your commute <strong>{numLU[wfhDays]} day{plural(wfhDays)} per week</strong>, across a year with 46 working weeks, you will need approximately <strong class="strongblue">{caloriesYear.toLocaleString()} fewer calories</strong>
									</p>
								{:else}
									<div style="width:80px">
										{@html CO2ePic}
									</div>
									<p class="pbox">
										By avoiding your commute <strong>{numLU[wfhDays]} day{plural(wfhDays)} per week</strong>, across a year with 46 working weeks, you will save <strong class="strongblue">{Math.round(yearSaving).toLocaleString()} kg CO2 equivalent</strong>
									</p>
								{/if}
							</div>
						</div>

						{#if (input[0].answerChoice=="Walk" | input[0].answerChoice=="Cycle")}
							<label>
							<p style="float:left; margin: 0px 50px 0px 0px;">How would you describe your diet?</p>
							<select class="addressSelect" id="select1" bind:value={input[3].answerChoice} on:change={comLengthFunc}>
							{#each input[3].answers as question}
								<option selected={question.selected} value={question.text}>
									{question.text}
								</option>
							{/each}
							</select>
							</label>
							<p>
								On a {input[3].answerChoice.toLowerCase()} diet, about <strong>{Math.round((yearSaving)*10)/10} kg CO2 equivalent</strong> would be emitted during the production of {caloriesYear.toLocaleString()} calories worth of food.
							</p>
						{/if}

						<div aria-live="assertive">
							<div class="orange">
								<div class="icon" style="width:100px">
									{@html tvPic}
								</div>
								<div>
									<p style="margin-bottom:0px !important">
										<strong>{Math.round(yearSaving).toLocaleString()} kg CO2 equivalent</strong> is emitted from the production of about <strong>{Math.round(totCommEm/0.21233).toLocaleString()} KWh</strong> of electricity in the UK. That's enough to power a 60 Watt TV for<strong class="strongorange">{Math.round(((totCommEm/0.21233)/0.06)/168)} full weeks</strong>
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
					<p>For some home workers, the emissions saved on commuting may be lost by heating their home while their usual place of work is run at reduced capacity.</p>
					<p>The amount of time remote workers choose to heat their home will be crucial in determining their household emissions.</p>
					<p><strong>How much CO2 equivalent is produced by your home's heating system?</strong></p>

						<div aria-live="assertive">
							<div class="input-group">
								<label class="visuallyhidden" for="costOfHeat">Enter your average annual heating costs</label>
								<input id="costOfHeat" class="typedInput" bind:value={manualHeat} placeholder="Average annual cost of heating (GBP)">
								<button id="cavBut" on:click={searchManHeat(manualHeat)}>Enter</button>
							</div>
							{#if manualHeatEnt>0}

								<label>
								<p style="float:left; margin: 0px 50px 0px 0px;">How is your heat generated?</p>
								<select class="addressSelect" id="select1b" bind:value={input[4].answerChoice} on:change={heatType}>
									{#each input[4].answers as question}
										<option selected={question.selected} value={question.text}>
											{homeFuelConv[question.text][0]}
										</option>
									{/each}
								</select>
								</label>
							
							{/if}

							<br>
							<br>

						{#if addressSelected | (manualHeatEnt>0)}
							<div class="grid-cont" style="grid-template-columns: 39% 59% !important;">
								<div class="grid-box" aria-live="assertive">
									<div style="width:90px">
										{@html moneyPic}
									</div>
									<p class="pbox">
										Based on <a href="https://www.gov.uk/government/statistics/uks-carbon-footprint" target=”_blank”>DEFRA's conversion factors</a>, <strong>£{heatCost} of heating from {selFuel.toLowerCase()}</strong> emits about <strong class="strongblue">{Math.round(heatCost*homeFuelConv[selFuel][1]).toLocaleString()} kg CO2 equivalent</strong>
									</p>
								</div>
								<br class="box-break">
								<div class="grid-box" aria-live="assertive">
									<div style="width:90px">
										{@html CO2ePic}
									</div>
									<p class="pbox">
										Based on typical heating hours and an <strong>average temperature of about 21°C</strong>, heating this property emits about <strong class="strongblue">{Math.round(1000*(heatCost*homeFuelConv[selFuel][1])/2618)} grams of CO2 equivalent per hour</strong>
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
										The average UK home emits about 2,806 kg CO2 equivalent on heating each year. <strong>For each hour</strong> the heating is switched on, this is approximately <strong class="strongblue">1,072 grams of CO2 equivalent</strong> 
									</p>
								</div>
							</div>
							<br>
						{/if}
					</div>
					<br>

					<p><strong>How many extra hours will you heat your house while working from home?</strong></p>
					<div id="slide-cont2">
						<RangeSlider bind:values={hoursHeated} min=0 max={24} float suffix=" hours per day" step={0.5} springValues={{ stiffness: 0.3, damping: 0.9 }}/>
					</div>



					{#if manualHeatEnt>0}

						<p>
							Heating your home for an additional <strong>{hoursHeated} hour{plural(hoursHeated)}</strong> will emit an extra <strong>{Math.round(((hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)*10)/10} kg CO2 equivalent per home working day</strong> during the heating season.
						</p>
						<p style="float:left; margin: 0px 50px 0px 0px;">How many others do you work from home with, on average?</p>
						<div class="blockFlex">
							<div class="input-group">
								<label class="visuallyhidden" for="shareInputb">Enter the number of people you share your home with during the day</label>
								<input style="width: 65px;" id="shareInputb" type=number step="0.5" min=0 max=12 bind:value={share2}>
							</div>
						</div>
						<br>
						<br>

						<div class="grid-cont">

							<div class="grid-box" aria-live="assertive">
								<div style="width:90px">
									{@html tempPic}
								</div>
								<p class="pbox">
									In a typical heating season of 34 weeks, working from home <strong>{numLU[wfhDays]} day{plural(wfhDays)} per week</strong>, for each person your heating system would emit an additional <strong class="strongblue">{Math.round((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618))/(share2+1))} kg CO2 equivalent per year</strong>
								</p>
							</div>

							<br class="box-break">

							<div class="grid-box" aria-live="assertive">
								<div style="width:90px">
									{@html CO2ePic}
								</div>
								<p class="pbox">
									Accounting for the emissions saved on your commute minus the additional emissions from heating your home, you will <strong class="strongblue">{((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm)>0?"emit an extra":"save about"} {Math.round(Math.abs((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm))} kg CO2 equivalent per year</strong>
								</p>
							</div>
						</div>

								<div class="grey-box" style="display: grid !important;grid-template-columns: auto auto;gap: 2%;padding: 20px;">
									<div>
										<p style="margin-bottom: 0px !important;margin-top: 10px;margin-left: 15px;">This makes up about <strong style="color: #206095; font-size: xx-large;padding: 3px;">{Math.round((Math.abs((((34*wfhDays*hoursHeated*1072)/1000)/(share2+1))-totCommEm)/12700)*100*10)/10}%</strong> of the total emissions of an average person in the UK</p>
									</div>
									<div style="width:100px; margin-right: 10px;">
										{@html CO2ePic}
									</div>
								</div>
								<br>

						<div aria-live="assertive">
							<div class = "green">
								<div class="icon" style="width:100px; padding-top: 15px;
								margin-left: -10px;
								margin-right: 10px;">
									{@html treePic2}
								</div>
								<div>
									<p style="margin-bottom: 0 !important;"><a href="https://www.eea.europa.eu/articles/forests-health-and-climate-change" target=”_blank”>A mature tree can absorb around 22 kg CO2 per year</a>. Therefore, <strong>{((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm)>0?"your extra":"your saved"} emissions</strong> would equate to the carbon capture of about <strong class="stronggreen">{
									((Math.abs((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm))/22).toFixed(0)
									} tree{plural(((Math.abs((((34*wfhDays*hoursHeated*heatCost*homeFuelConv[selFuel][1])/2618)/(share2+1))-totCommEm))/22).toFixed(0))}</strong>
									</p>
								</div>
							</div>
						</div>

					{:else}
						<p>
							Heating the average home for an additional <strong>{hoursHeated} hour{plural(hoursHeated)}</strong> will emit an extra <strong>{Math.round(((hoursHeated*1072)/1000)*10)/10} kg CO2 equivalent per home working day</strong> during the heating season.
						</p>
						<p style="float:left; margin: 0px 50px 0px 0px;">How many others do you work from home with, on average?</p>
						<div class="blockFlex">
							<div class="input-group">
								<label class="visuallyhidden" for="shareInputb">Enter the number of people you share your home with during the day</label>
								<input style="width: 65px;" id="shareInputb" type=number step="0.5" min=0 max=12 bind:value={share2}>
							</div>
						</div>
						<br>

						<div class="grid-cont">

							<div class="grid-box" aria-live="assertive">
								<div style="width:90px">
									{@html tempPic}
								</div>
								<p class="pbox">
									In a typical heating season of 34 weeks, working from home <strong>{numLU[wfhDays]} day{plural(wfhDays)} per week</strong>, an average heating system would emit an additional <strong class="strongblue">{Math.round((((34*wfhDays*hoursHeated*1072)/1000)/(share2+1))*10)/10} kg CO2 equivalent per year for each person</strong>
								</p>
							</div>
							<br class="box-break">
							<div class="grid-box" aria-live="assertive">
								<div style="width:90px">
									{@html CO2ePic}
								</div>
								<p class="pbox">
									Accounting for the emissions saved on your commute minus the additional emissions from heating your home, you will <strong class="strongblue">{((((34*wfhDays*hoursHeated*1072)/1000)/(share2+1))-totCommEm)>0?"emit an extra":"save about"} {Math.round(Math.abs((((34*wfhDays*hoursHeated*1072)/1000)/(share2+1))-totCommEm))} kg CO2 equivalent per year</strong>
								</p>
							</div>
						</div>

								<div class="grey-box" style="display: grid !important;grid-template-columns: auto auto;gap: 2%;padding: 20px;">
									<div>
										<p style="margin-bottom: 0px !important;margin-top: 10px;margin-left: 15px;">This makes up about <strong style="color: #206095; font-size: xx-large;padding: 3px;">{Math.round((Math.abs((((34*wfhDays*hoursHeated*1072)/1000)/(share2+1))-totCommEm)/12700)*100*10)/10}%</strong> of the total emissions of an average person in the UK</p>
									</div>
									<div style="width:100px; margin-right: 10px;">
										{@html CO2ePic}
									</div>
								</div>
								<br>

						<div aria-live="assertive">
							<div class = "green">
								<div class="icon" style="width:100px; padding-top: 15px;
								margin-left: -10px;
								margin-right: 10px;">
									{@html treePic2}
								</div>
								<div>
									<p style="margin-bottom: 0 !important;"><a href="https://www.eea.europa.eu/articles/forests-health-and-climate-change" target=”_blank”>A mature tree can absorb around 22 kg CO2 per year</a>. Therefore, <strong>{((((34*wfhDays*hoursHeated*1072)/1000)/(share2+1))-totCommEm)>0?"your extra":"your saved"} emissions</strong> would equate to the carbon capture of about <strong class="stronggreen">{((Math.abs((((34*wfhDays*hoursHeated*1072)/1000)/(share2+1))-totCommEm))/22).toFixed(0)} tree{plural(((Math.abs((((34*wfhDays*hoursHeated*1072)/1000)/(share2+1))-totCommEm))/22).toFixed(0))}</strong></p>
								</div>
							</div>
						</div>
					{/if}
					</section>
				</div>
				<br>
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
  #slide-cont, #slide-cont2 {
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
	box-shadow: 0 0 0 3pt #fbdd02 !important;
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
 #cavBut, #cavButb, #cavButc {
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
/* .col-wrap {
	delete before florence
 	margin-left: 20% !important;
} */
.box-break {
	display: none
}
.icon {
	float:left
}
@media only screen and (max-width: 767px) {
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
	  padding: 0;
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