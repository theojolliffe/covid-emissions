<script>
	import UInputs from './userInputs.json';  
	import vehicleLU from './vehicalLookup.json';  
	import "./custom.css";

	let input = UInputs.results;
		
	function handleAnswer(e = {}, members) { 
	}
	console.log('input', input)
  
	let share = 1;
	let hoursHeated = 5;
	function plural(share) { return share==1?"":"s";}
	let wfhDpW = 1
	let manualVeh;
	let manualHeat;
  
	let commMethod = false
	function addMethod() {
	  commMethod = !commMethod
	}
	let usage = false
	function addUsage() {
	  usage = !usage
	}
	function searchManHeat(searchManHeat) {
	  return searchManHeat
	}
  
	let searched = false;
	  let addressSelected = false;
	  let loadEr = false;
	  let postCode = '';
  
	let selectAd;
	let epcData;
  
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
			console.log('EPC DATA', data.rows);
			epcData = data.rows
			searched = true;
		})
		.catch((error) => {
			loadEr = true
			console.log(error)
		});
  }
	function addressSel() {
		addressSelected = true
		console.log("selectAd", selectAd)
	}
	let carTypeLookup = {"City car": ["Citroën C1", "Fiat Panda"], "Supermini": ["Ford Fiesta", "Renault CLIO"], "Small family car": ["Volkswagen Golf", "Ford Focus"], "Large family car": ["BMW 3 Series", "ŠKODA Octavia"], "Executive": ["BMW 5 Series", "Audi A5"], "Luxury": ["Jaguar XF", "Mercedes-Benz S-Class"], "Sports car": ["Mercedes-Benz SLK", "Porsche 911"], "4x4/SUV": ["Suzuki Jimny", "Land Rover Discovery"], "Multi-Purpose Vehicle": ["Ford C-Max", "Renault Scenic"]}
  
	$:vehcLU = vehicleLU["Car"][input[1].answerChoice][input[2].answerChoice]
	$:vehConsump = (input[0].answerChoice=="Car")? vehcLU : vehicleLU[input[0].answerChoice];
  
	function searchManVeh(manualVeh) {
	  vehConsump = manualVeh/1000;
	}
	let comLU = {Walk: 2.9, Cycle: 10.6, Bus: 17.1, Train: 55.0, 'London Underground': 55.0, Motorbike: 31.4, Car: 31.4}
	let comLength = comLU[input[0].answerChoice];
	function comLengthFunc() {
	  comLength = comLU[input[0].answerChoice];
	}
	let numLU = {0: 'no', 0.5: '0.5', 1: 'one', 1.5: 'one and a half', 2: 'two', 2.5: 'two and a half', 3: 'three', 3.5: 'three and a half', 4: 'four', 5: 'five'}
  
	let tree = "🌳"
	let bulb = "💡"
	$:yearSaving = (44*wfhDpW*(vehConsump*comLength))/(share+1)
  </script>
  
  <main>
	<div class="wrapper">
	  <div class="col-wrap">
		<article class="col">
		  <div class="section__content--markdown">
			<section>
			  <header>
				<h2>Will working from home cut UK emissions?</h2>
			  </header>
			  <p>
				Most people (85%) who worked from home during the pandemic want to use a "hybrid" approach of both home and office work in future, <a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/businessandindividualattitudestowardsthefutureofhomeworkinguk/apriltomay2021" target="_blank">according to BICS data
			  </p>
			  <p>
				However, there was some uncertainty among businesses, with 32% stating they were not sure what proportion of the workforce will be working from their usual place of work, and 38% expected the majority of their workforce to come back.
			  </p>
			  <p>
				It is unclear whether continued remote working will reduce or increase UK emissions but individuals can estimate the impact of working from home on their household emissions.
			  </p>
			  <p>
				Those with longer commutes on the road and lower levels of home energy consumption are more likely to see a reduction in emissions for each day they work from home.
			  </p>
			</section>
		  </div>
		  <div class="section__content--markdown">
			<section>
			  <header>
				<h3>The commute</h3>
			  </header>


			  <form style="float:left">
			
				<p style="float:left; margin: 0px 50px 0px 0px;">How do you travel to work?</p>
			  
				<!-- svelte-ignore a11y-no-onchange -->
				<select class="addressSelect" id="select1" bind:value={input[0].answerChoice} on:change={comLengthFunc}>
					{#each input[0].answers as question}
						<option selected={question.selected} value={question.text}>
							{question.text}
						</option>
					{/each}
				</select>
			  
			  {#if input[0].answerChoice=="Car"}
				<p style="float:left; margin: 0px 50px 0px 0px;">What kind of car do you drive?</p>

				<!-- svelte-ignore a11y-no-onchange -->
				  <select class="addressSelect" id="select2" bind:value={input[1].answerChoice} on:change={e => handleAnswer()}>
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

				<!-- svelte-ignore a11y-no-onchange -->
				<select class="addressSelect" id="select3" bind:value={input[2].answerChoice} on:change={e => handleAnswer()}>
					{#each input[2].answers as question}
						<option selected={question.selected} value={question.text}>
							{question.text}
						</option>
					{/each}
				</select>

				<p style="float:left; margin: 0px 50px 0px 0px;">On average, how many people do you ride with?</p>
				<div style="display: flex;">
						<div class="input-group">
							<label class="visuallyhidden" for="shareInput">Enter the number of people you share your commute with</label>
							<input id="shareInput" type=number step="0.5" min=0 max=4 bind:value={share}>
						</div>
				</div>

			  {/if}



			</form>
  
			  {#if input[0].answerChoice=="Walk"}
				  <p style="display: inline-block;">
					The average daily round commute is <strong>2.9 km</strong> for those who walk to work, according to the National Travel Survey.</p><p>Walking to work emits no greenhouse gas, although GHG is emitted during the production of the food that provides the required calories.
				  </p>
			  {:else if input[0].answerChoice=="Cycle"}
				<p style="display: inline-block;">
				  The average daily round commute is <strong>10.6 km</strong> for those who cycle to work, according to the National Travel Survey.</p><p>Cycling to work emits no greenhouse gas, although bike manufacturing produces some greenhouse gas, as does producing the food needed for energy to cycle.
				</p>
			  {:else if input[0].answerChoice=="Bus"}
				  <p style="display: inline-block;">
					The average daily round commute is <strong>17.1 km</strong> for people who take the bus, according to the National Travel Survey.</p><p>Taking the bus to work emits approximately <strong>103 grams of CO<sub>2</sub>e</strong> per kilometre for each passenger.<p>
				  </p> 
			  {:else if input[0].answerChoice=="Train" }
				  <p style="display: inline-block;">
					The average daily round commute by rail is <strong>55.0 km</strong>, according to the National Travel Survey.</p><p>Taking the train to work emits, on average, <strong>36 grams of CO<sub>2</sub>e</strong> per kilometre for each passenger, depending on how full the train is.
				  </p> 
			  {:else if input[0].answerChoice=="London Underground" }
				  <p style="display: inline-block;">
					The average daily round commute by rail is <strong>55.0 km</strong>, according to the National Travel Survey.</p><p>Taking the tube to work emits, on average, <strong>28 grams of CO<sub>2</sub>e</strong> per kilometre for each passenger, depending on how full the tube is.
				  </p>
			  {:else if input[0].answerChoice=="Motorbike" }
				  <p style="display: inline-block;">
					The average daily round commute by road is <strong>31.4 km</strong>, according to the National Travel Survey.</p><p>Riding a motorbike to work emits about <strong>101 grams of CO<sub>2</sub>e</strong> per kilometre.
				  </p>
			  {:else}
				  <p style="display: inline-block;">
					The average daily round commute by road is <strong>31.4 km</strong>, according to the National Travel Survey.</p><p>Your vehicle emits approximately <strong>{Math.round(vehcLU*1000)} grams of CO<sub>2</sub>e</strong> per kilometre.
				  </p>
			  {/if}
  
			  <div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 16px; padding: 20px;"><p>If your vehicle type isn't listed you can manually enter your vehicle's fuel consumption rate.</p><p>The <a href="https://carfueldata.vehicle-certification-agency.gov.uk">Vehicle Certification Agency</a> has information about the fuel consumption rate of different vehicles.</p><button id="cavBut" on:click={addMethod}>Enter your vehicle's fuel consumption rate</button>
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
				<div class="input-group">
					<label class="visuallyhidden" for="commSlide">Specify the length of your round commute</label>
					<input class="slider" id="commSlide" type=range step="1" min=0 max=300 bind:value={comLength}>
				</div>
			  </div>
			  {#if input[0].answerChoice=="Walk"}
				<p>
				  Commuting <strong>{comLength} km</strong>, you will burn about {comLength*70} calories, depending on the speed you walk and other metabolic factors.
				</p>
			  {:else}
				<p>Commuting <strong>{comLength} km</strong>,
				  {#if input[0].answerChoice=="Car"}
					sharing your journey with, on average, {numLU[share]} other{plural(share)}, individually
				  {/if}
				  you will emit <strong>{Math.round((vehConsump*comLength)/(share+1)*10)/10} kg of GHG</strong>.
				</p>
			  {/if}
  
			  <p style="float:left; margin: 0px 50px 0px 0px;">How many days will you work from home each week?</p>
				<div style="display: flex;">
						<div class="input-group">
							<label class="visuallyhidden" for="wfhDpW">Enter the amount of days you will work from home each week</label>
							<input id="wfhDpW" type=number step="1" min=0 max=5 bind:value={wfhDpW}>
						</div>
				</div>

			  {#if input[0].answerChoice=="Walk"}
				<p>
				  Avoiding your commute {numLU[wfhDpW]} day{plural(wfhDpW)} per week, you will save {44*wfhDpW*comLength*70} calories in a typical year of 44 working weeks. If you consumed a diet of beef, cheese, rice and peas, <strong>{Math.round((4.965*(4*wfhDpW*comLength*70)/1000)*10)/10} kg CO<sub>2</sub>e</strong> would be emitted in food production.
				</p>
				<p>
				  The same amount of calories may still be consumed when working from home and the walk to work may be replaced with recreational exercise.
				</p>
			  {:else}
			  <p>
				Avoiding your commute {numLU[wfhDpW]} day{plural(wfhDpW)} per week, you will save  <strong>{Math.round(yearSaving*10)/10} kg CO<sub>2</sub>e</strong> in a typical year of 44 working weeks.
			  </p>
			  {/if}
  
			  <div class = "green">
				<p>
				  {(input[0].answerChoice=="Walk")?Math.round((4.965*(4*wfhDpW*comLength*70)/1000)*10)/10:Math.round(44*wfhDpW*(vehConsump*comLength)/(share+1)*10)/10} 
				  kg CO2e can generate about {
				  (input[0].answerChoice=="Walk")?Math.round(((4.965*(4*wfhDpW*comLength*70)/1000)/0.870)*10)/10:Math.round((yearSaving/0.870)*10)/10
				  } KWh of electricity from coal, enough to power a 60 Watt <strong>light bulb for about {
				  (input[0].answerChoice=="Walk")?Math.round(((((4.965*(4*wfhDpW*comLength*70)/1000)/0.870)/0.06)/24)):Math.round((((yearSaving/0.870)/0.06)/24))
				  } days</strong> (24 hour).
				</p>
				{#if input[0].answerChoice=="Walk"}
				<p style="font-size: xx-large;">{Array(+((((4.965*(4*wfhDpW*comLength*70)/1000)/0.870)/0.06)/24).toFixed(0)).fill(0).map(d => bulb).join("")}</p>
				{:else}
				<p style="font-size: xx-large;">{Array(+(((yearSaving/0.870)/0.06)/24).toFixed(0)).fill(0).map(d => bulb).join("")}</p>
				{/if}
			  </div>
  
			</section> 
		  </div>
		  <div class="section__content--markdown">
			<section>
			  <h3>The remote workplace</h3>
			  <p>For many home workers, the GHG emissions saved on commuting will be lost to heating their home while their usual place of work is being ran at reduced capacity.</p>
			  <h4>How much CO<sub>2</sub> is produced by your home's heating system?</h4>
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
				  <div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 16px;">
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
					  <!-- svelte-ignore a11y-no-onchange -->
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
				  <br>
				  <div style="background-color: #EAEAEA; padding: 16px 16px; margin-bottom: 16px;"><p>If there is no publicly avaiable data for your address consider looking at a nearby property of similar size.</p><button id="cavBut" on:click={addUsage}>Or manually enter your heating costs</button>
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
						According to <a href="https://epc.opendatacommunities.org/">Energy Performance of Buildings Data</a>, this {selectAd['total-floor-area']} m<sup>2</sup> {selectAd['property-type'].toLowerCase()} has {selectAd['number-heated-rooms']} heated rooms and emits about {selectAd['co2-emissions-current']} tonnes of CO<sub>2</sub> in an average year.
					  </p>
					  <p>
						Heating this property costs approximately £{selectAd['heating-cost-current']} per year, producing about {selectAd['heating-cost-current']*6.966} kgCO<sub>2</sub>e (based on DEFRA's conversion factors).
					  <p>
						This property emits approximately {(selectAd['heating-cost-current']*6.966)/2618} kgCO<sub>2</sub>e for each hour the heating is switched on.
					  </p>
				  </div>
			  {/if}
			  <p>The amount of time remote workers choose to heat their home will be crucial in determining their household emissions.</p>
			  <p><strong>How many extra hours will you heat your house?</strong></p>
			  <div id="slide-cont">
				<div class="input-group">
					<label class="visuallyhidden" for="hoursSlide">Specify the length of your round commute</label>
					<input class="slider" id="hoursSlide" type=range step="1" min=0 max=24 bind:value={hoursHeated}>
				</div>
			  </div>
			  <p>
				Heating the average house for an additional <strong>{hoursHeated} hours</strong> each home working day, twice per week per day, you would use an additional 332,112kg of GHG in a typical year of 44 working weeks.
			  </p>
			  <div class = "green">
				<p>A mature tree can absorb around <strong>22 kg of CO<sub>2</sub></strong> per year. Therefore, you would need to plant about <strong>{
				  (input[0].answerChoice=="Walk")?((4.965*(4*wfhDpW*comLength*70)/1000)/22).toFixed(0):(yearSaving/22).toFixed(0)
				  } trees</strong> per year in order to save <strong>{
				  (input[0].answerChoice=="Walk")?Math.round((4.965*(4*wfhDpW*comLength*70)/1000)*10)/10:Math.round(yearSaving*10)/10
				  } kg CO<sub>2</sub>e</strong>.</p>
				<p style="font-size: xx-large;">{Array(+(yearSaving/22).toFixed(0)).fill(0).map(d => tree).join("")}</p>
			  </div>
			</section>
		  </div>
		  <div class="section__content--markdown">
			<section>
			  <p>In one year working from home 3 days every week you would approximately save xx tonnes of GHG</p>
			  <p>This makes up about 12% of the total emissions of the average person in the UK.</p>
			  <p>Heating only the room you are working in, working at local hubs and seasonal commuting patterns (travelling to work in the winter) could all prove to be environmentally friendly options for the future of work.</p>
			</section>
		  </div>
		</article> 
	  </div>
	</div>
  </main>