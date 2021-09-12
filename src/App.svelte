<script>
	import UInputs from './userInputs.json';  
	import vehicleLU from './vehicalLookup.json';  
	import RangeSlider from "svelte-range-slider-pips";
	import carTypeLookup from './carTypeLookup.json'
	import homeFuelConv from './homeFuelConv.json'

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
	let manualHeat;
	let selectAd;
	let epcData;
	let postCode = '';
	let input = UInputs.results;
	let share = 0;
	let hoursHeated = [5];
	let wfhDpW = 1;
	let wfhDays=1;
	let tree = "🌳"
	let bulb = "💡"
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
	let selFuel;
	$:vehcLU = vehicleLU["Car"][input[1].answerChoice][input[2].answerChoice];
	$:vehConsump = (input[0].answerChoice=="Car")? vehcLU : vehicleLU[input[0].answerChoice];
	$:yearSaving = (46*wfhDays*(vehConsump*comLength))/(share+1)
	$:walkEm = dietLU[input[3].answerChoice]*(46*wfhDays*km*70)/2000
	$:totCommEm = (input[0].answerChoice=="Walk")? walkEm:Math.round(yearSaving*10)/10;

	function totYearComm() {
		if (input[0].answerChoice=="Walk") {
			console.log("cec")
			totCommEm = dietLU[input[3].answerChoice]*(46*wfhDays*km*70)/2000
		} else if (input[0].answerChoice=="Cycle") {
			totCommEm = 4.965*(4*wfhDays*comLength*70)/1000
		} else {
			totCommEm = (46*wfhDays*(vehConsump*comLength))/(share+1)
		}
		totCommEm = Math.round(totCommEm*10)/10
	}
	function plural(share) { return share==1?"":"s";}
	function addMethod() { commMethod = !commMethod }
	function addUsage() { usage = !usage }
	function searchManHeat(searchManHeat) { return searchManHeat }
	function addressSel() {
		addressSelected = true;
		let gas = ["Gas: mains", "mains gas "]
		let elec = ["Electricity", "electricity"]
		let coal = ["Solid fuel: house coal", "house coal (not community)", "smokeless coal"]
		let oil = ["Oil", "oil"]
		let paraffin = ["Gas: bulk", "LPG (comm", "LPG (not ", "LPG - thi", "bottled L"]
		if (gas.includes(selectAd['main-fuel'].slice(0,10))) { selFuel = "Gas" }
		else if (elec.includes(selectAd['main-fuel'].slice(0,11))) { selFuel = "Electricity" }
		else if (coal.includes(selectAd['main-fuel'])) { selFuel = "Coal and coke" }
		else if (oil.includes(selectAd['main-fuel'].slice(0,3))) { selFuel = "Oil for central heating" }
		else if (paraffin.includes(selectAd['main-fuel'].slice(0,9))) { selFuel = "Paraffin etc" }
		else { selFuel = "No data" }
		console.log("fuelConv", homeFuelConv[selFuel])
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
									<p style="float:left; margin: 0px 50px 0px 0px;">On average, how many other people do you commute with?</p>
									<div class="blockFlex">
										<div class="input-group">
											<label class="visuallyhidden" for="shareInput">Enter the number of people you share your commute with</label>
											<input id="shareInput" type=number step="0.5" min=0 max=4 bind:value={share}>
										</div>
									</div>
								{/if}
							</form>
							<div aria-live="assertive">
							{#if input[0].answerChoice=="Walk"}
								<p style="display: inline-block;">
									The average daily round commute is <strong>1.8 miles</strong> (2.9 km) for those who walk to work, according to the National Travel Survey.</p><p>Walking to work emits no greenhouse gas, although GHG is emitted during the production of the food that provides the required calories.
								</p>
							{:else if input[0].answerChoice=="Cycle"}
								<p style="display: inline-block;">
								The average daily round commute is <strong>6.8 miles</strong> (10.9 km) for those who cycle to work, according to the National Travel Survey.</p><p>Cycling to work emits no greenhouse gas, although bike manufacturing produces some greenhouse gas, as does producing the food needed for energy to cycle.
								</p>
							{:else if input[0].answerChoice=="Bus"}
								<p style="display: inline-block;">
									The average daily round commute is <strong>12.7 miles</strong> (20.4 km) for people who take the bus, according to the National Travel Survey. The average round commute on a London bus is <strong>9.6 miles</strong> (15.4 km).</p><p>Taking the bus to work emits approximately <strong>103 grams of CO2e</strong> per kilometre for each passenger.<p>
								</p> 
							{:else if input[0].answerChoice=="Train" }
								<p style="display: inline-block;">
									The average daily round commute by train is <strong>47 miles</strong> (75.6 km), according to the National Travel Survey.</p><p>Taking the train to work emits, on average, <strong>36 grams of CO2e</strong> per kilometre for each passenger, depending on how full the train is.
								</p> 
							{:else if input[0].answerChoice=="London Underground" }
								<p style="display: inline-block;">
									The average daily round commute on the London Underground is <strong>18.6 miles</strong> (30 km), according to the National Travel Survey.</p><p>Taking the tube to work emits, on average, <strong>28 grams of CO2e</strong> per kilometre for each passenger, depending on how full the tube is.
								</p>
							{:else if input[0].answerChoice=="Motorbike" }
								<p style="display: inline-block;">
									The average daily round motorbike is <strong>18 miles</strong> (29 km), according to the National Travel Survey.</p><p>Riding a motorbike to work emits about <strong>101 grams of CO2e</strong> per kilometre.
								</p>
							{:else}
								<p style="display: inline-block;">
									The average daily round car commute is <strong>20.9 miles</strong> (33.6 km), according to the National Travel Survey.</p><p>This vehicle emits approximately <strong>{Math.round(vehcLU*1000)} grams of CO2e</strong> per kilometre.
								</p>
								{#if input[2].answerChoice=="Electric Vehicle"}
									<p>Although electric vehicles do not directly emit any greenhouse gas, the electricity they run on has an associated carbon cost.</p>
								{/if}
							{/if}
							</div>
							<div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 36px; padding: 20px;"><p>If your vehicle type isn't listed you can manually enter your vehicle's fuel consumption rate.</p><p>The <a href="https://carfueldata.vehicle-certification-agency.gov.uk" target=”_blank”>Vehicle Certification Agency</a> has information about the fuel consumption rate of different vehicles.</p><button id="cavBut" on:click={addMethod}>Enter your vehicle's fuel consumption rate</button>
								{#if commMethod}
									<div class="input-group">
										<label class="visuallyhidden" for="fuelInput">Enter your vehicle's fuel consumption rate</label>
										<input class="typedInput" id="fuelInput" bind:value={manualVeh} placeholder="Grams of CO2e per kilometre">
										<button id="cavBut" on:click={searchManVeh(manualVeh)}>
											Enter
										</button>
									</div>
								{/if}
							</div>
							<p><strong>How far is your daily round commute?</strong></p>
							<div id="slide-cont">
								<RangeSlider bind:values={comLength} min=0 max={200} float suffix=" miles" step={0.1} springValues={{ stiffness: 0.3, damping: 0.7 }}/>
							</div>

							<div aria-live="assertive">
								{#if input[0].answerChoice=="Walk"}
									<p>
									Commuting <strong>{comLength} miles</strong> ({Math.round(km*10)/10} km), you will burn about <strong>{Math.round(km*70).toLocaleString()} calories</strong>, depending on the speed you walk and other metabolic factors.
									</p>
								{:else}
									<p>Commuting <strong>{comLength} miles</strong> ({Math.round(km*10)/10} km),
									{#if input[0].answerChoice=="Car"}
										{#if share==0}
											without sharing your journey,
										{:else}
											sharing your journey with {numLU[share]} other{plural(share)}, individually
										{/if}
									{/if}
									you emit approximately <strong>{Math.round((vehConsump*km)/(share+1)*10)/10} kg CO2e</strong>.
									</p>
								{/if}
							</div>
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

							<div aria-live="assertive">
								{#if input[0].answerChoice=="Walk"}
									<p>
										Avoiding your commute <strong>{numLU[wfhDays]} day{plural(wfhDays)} per week</strong>, you will need approximately <strong>{Math.round(46*wfhDays*km*70).toLocaleString()} fewer calories</strong> in a typical year of 46 working weeks.
									</p>

									<p style="float:left; margin: 0px 50px 0px 0px;">How would you describe your diet?</p>
									<select class="addressSelect" id="select1" bind:value={input[3].answerChoice} on:change={comLengthFunc}>
										{#each input[3].answers as question}
											<option selected={question.selected} value={question.text}>
												{question.text}
											</option>
										{/each}
									</select>

									<p>
										On a {input[3].answerChoice.toLowerCase()} diet, about <strong>{Math.round((dietLU[input[3].answerChoice]*(46*wfhDays*km*70)/2000)*10)/10} kg CO2e</strong> would be emitted during the production of {Math.round(46*wfhDays*km*70).toLocaleString()} calories worth of food.
									</p>
	

									<p>
										For many, working from home will not result in the expenditure of less calories and will therefore not represent a reduction in dietary emissions.
									</p>
								{:else}
									<p>
										Avoiding your commute <strong>{numLU[wfhDays]} day{plural(wfhDays)} per week</strong>, you will save  <strong>{Math.round(yearSaving*10)/10} kg CO2e</strong> across a 46 working week year.
									</p>
								{/if}
							</div>
				
							<div aria-live="assertive">
							<div class = "green">
								<p>
								This is similar to the quantity of emissions asociated with using about <strong>{Math.round((totCommEm/0.23314)*10)/10} KWh</strong> of electricity in the UK, based on BEIS conversion factors.</p><p>A 60 Watt light bulb could be powered for about <strong>{Math.round(((totCommEm/0.23314)/0.06)/168)} full weeks</strong> using this much electricity.
								</p>
								<div aria-hidden="true">
									<p style="font-size: xx-large;">{Array(+(((totCommEm/0.23314)/0.06)/168).toFixed(0)).fill(0).map(d => bulb).join("")}</p>
								</div>
							</div>
						</div>
					</section>
				</div>
		<div class="section__content--markdown">
			<section>
			  <h3>The remote workplace</h3>
			  <p>For many home workers, the emissions saved on commuting will be lost to heating their home while their usual place of work is run at reduced capacity.</p>
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
			<div aria-live="assertive">
			  {#if loadEr}
				  <div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 36px;">
					  <p><strong>Please enter a full and valid post code.</strong></p>
					  <p>If there is no publicly avaiable data for your address consider looking at a nearby property of similar size.</p><button id="cavBut" on:click={addUsage}>Or manually enter your heating costs</button>
						{#if usage}
						<div class="input-group">
							<label class="visuallyhidden" for="costOfHeat">Enter your average annual heating costs</label>
							<input id="costOfHeat" class="typedInput" bind:value={manualHeat} placeholder="Average annual cost of heating (GBP)">
							<button id="cavBut" on:click={searchManHeat(manualHeat)}>
							  Search
							</button>
						</div>
						{/if}
				  </div>
			  {/if}
			  {#if searched}
				  <form class="addressForm">
					  <select class="addressSelect" id="select4" bind:value={selectAd} on:blur={e => addressSel(e)} on:change={e => addressSel(e)}>
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
					{#if addressSelected}
						<div>
							<p>
								This {selectAd['total-floor-area']} m<sup>2</sup> {selectAd['property-type'].toLowerCase()} has {numLU[selectAd['number-heated-rooms']]} heated rooms and is heated using {homeFuelConv[selFuel][0]}, according to <a href="https://epc.opendatacommunities.org/" target=”_blank”>Energy Performance of Buildings data</a>.
							</p>
						</div>
					{/if}
					<br>
					<div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 36px;"><p>If there is no publicly avaiable data for your address consider looking at a nearby property of similar size.</p><button id="cavBut" on:click={addUsage}>Or manually enter your heating costs</button>
					{#if usage}
					<div class="input-group">
						<label class="visuallyhidden" for="costOfHeat2">Enter your average annual heating costs</label>
						<input id="costOfHeat2" class="typedInput" bind:value={manualHeat} placeholder="Average annual cost of heating (GBP)">
						<button id="cavBut" on:click={searchManHeat(manualHeat)}>
							Search
						</button>
					</div>
					{/if}
					</div>
				{/if}
				{#if addressSelected}
					<div>
						<p>
							Heating this property costs approximately £{selectAd['heating-cost-current']} annually, based on the Standard Assessment Procedure's (SAP) estimate of 2,618 hours of home heating per year at about 21°C.
						<p>
							Based on DEFRA's conversion factors, the property's heating system emits about {Math.round(selectAd['heating-cost-current']*homeFuelConv[selFuel][1]).toLocaleString()} kg CO2e each year. This is approximately <strong>{Math.round(1000*(selectAd['heating-cost-current']*homeFuelConv[selFuel][1])/2618)} grams of CO2e</strong> for each hour the heating is switched on.
						</p>
					</div>
				{:else}
					<p>The average UK home emits about 2,349 kg CO2e on heating each year. This is approximately <strong>897 grams of CO2e</strong> for each hour the heating is switched on.</p>
				{/if}
			</div>
			<p><strong>How many extra hours will you heat your house while working from home?</strong></p>
			<div id="slide-cont">
				<RangeSlider bind:values={hoursHeated} min=0 max={24} float suffix=" hours per day" step={0.5} springValues={{ stiffness: 0.3, damping: 0.9 }}/>
			</div>
			{#if addressSelected}
				<p>
					Heating your home for an additional <strong>{hoursHeated} hour{plural(hoursHeated)}</strong> will emit an extra <strong>{Math.round(((hoursHeated*selectAd['heating-cost-current']*homeFuelConv[selFuel][1])/2618)*10)/10} kg CO2e per home working day</strong> during the heating season.
				</p>
				<p>
					Considering SAP's heating season of 34 weeks, working from home {numLU[wfhDays]} day{plural(wfhDays)} per week, your heating system would emit an additional <strong>{Math.round(((34*wfhDays*hoursHeated*selectAd['heating-cost-current']*homeFuelConv[selFuel][1])/2618))} kg CO2e per year</strong>.
				</p>
			<div aria-live="assertive">
			  <div class = "green" style="min-height: 337px;">
				<p>
					Accounting for the emissions saved on your commute minus the additional emissions from heating your home, you will <strong>{(((34*wfhDays*hoursHeated*selectAd['heating-cost-current']*homeFuelConv[selFuel][1])/2618)-totCommEm)>0?"emit about an extra":"save approximately"} {Math.round(Math.abs(((34*wfhDays*hoursHeated*selectAd['heating-cost-current']*homeFuelConv[selFuel][1])/2618)-totCommEm))} kg CO2e per year</strong>.
				</p>
				<p>A mature tree can absorb around 22 kg CO2 per year. Therefore, the change in your emissions due to working from home would equate to the carbon capture of about <strong>{
				  ((Math.abs(((34*wfhDays*hoursHeated*selectAd['heating-cost-current']*homeFuelConv[selFuel][1])/2618)-totCommEm))/22).toFixed(0)
				  } trees</strong>.</p>
				<div aria-hidden="true">
					<p style="font-size: xx-large;">{Array(+((Math.abs(((34*wfhDays*hoursHeated*selectAd['heating-cost-current']*homeFuelConv[selFuel][1])/2618)-totCommEm))/22).toFixed(0)).fill(0).map(d => tree).join("")}</p>
				</div>
			  </div>
			</div>
			{:else}
				<p>
					Heating the average home for an additional <strong>{hoursHeated} hour{plural(hoursHeated)}</strong> will emit an extra <strong>{Math.round(((hoursHeated*897)/1000)*10)/10} kg CO2e per home working day</strong> during the heating season.
				</p>
				<p>
					Considering SAP's heating season of 34 weeks, working from home {numLU[wfhDays]} day{plural(wfhDays)} per week, an average heating system would emit an additional <strong>{Math.round(((34*wfhDays*hoursHeated*897)/1000)*10)/10} kg CO2e per year</strong>.
				</p>
				<div aria-live="assertive">
					<div class = "green" style="min-height: 337px;">
						<p>
							Accounting for the emissions saved on your commute minus the additional emissions from heating your home, you will <strong>{(((34*wfhDays*hoursHeated*897)/1000)-totCommEm)>0?"emit about an extra":"save approximately"} {Math.round(Math.abs(((34*wfhDays*hoursHeated*897)/1000)-totCommEm))} kg CO2e per year</strong>.
						</p>
						<p>A mature tree can absorb around 22 kg CO2 per year. Therefore, the change in your emissions due to working from home would equate to the carbon capture of about <strong>{((Math.abs(((34*wfhDays*hoursHeated*897)/1000)-totCommEm))/22).toFixed(0)} trees</strong>.</p>
						<div aria-hidden="true">
							<p style="font-size: xx-large;">{Array(+((Math.abs(((34*wfhDays*hoursHeated*897)/1000)-totCommEm))/22).toFixed(0)).fill(0).map(d => tree).join("")}</p>
						</div>
					</div>
				</div>
			{/if}
			</section>
		  </div>
		  <div class="section__content--markdown">
			<section>
			  <p>This makes up about 12% of the total emissions of the average person in the UK.</p>
			  <p>Heating only the room you are working in, working at local hubs and seasonal commuting patterns (travelling to work in the winter) could all prove to be environmentally friendly options for the future of work.</p>
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
  }
  article {
	  display: block;
  }
  .col {
	overflow: visible;
	margin-left: 16px !important;
	margin-top: 32px !important;
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
	  margin: 32px 0 16px 0;
	  padding: 24px 0 0 0;
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

 .green { background-color:#a1d99b; border-radius: 5px; padding: 20px; font-size: xx-large;}
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




@media (max-width: 767px) {
	.section__content--markdown {
	  padding: 0;
	}
	.typedInput {
		font-size: 14px !important;
	}
	p {
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
	  margin: 0 auto;
	  padding: 0 16px;
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
		margin-left: -16px;
	}
  }
  @media (min-width: 992px) {
	.col-wrap {
		width: 960px;
		margin-left: -16px;
	}
  } 

  </style>