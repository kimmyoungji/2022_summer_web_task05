<script lang='ts'>
    import Index from '@src/routes/index.svelte';
    import {updateData, priceData, type PriceUnit, priceDataNames} from '@src/store/index'
    import { onMount } from 'svelte';
    export let title:string;

    onMount(()=>{
        updateData(7);
    })
</script>

<div class="root">
    <h1>{title}</h1>
    <div class = "tableFrame">
        <table class="dataTable">
            <tr class="tableHeader">
                {#each $priceDataNames as name }
                    <th>{name}</th>
                {/each}
            </tr>

            {#each $priceData as price}
                <tr class="tableItems">
                    <td class="name">{price.demon}</td>
                    <td class="timestamp">{price.timestamp}</td>
                    <td class="price">{price.price}</td>
                    <td class="marketCap">{price.marketCap}</td>
                    <td class="dayVolume">{price.dayVolume}</td>
                </tr>
            {/each}
        </table>
    </div>
</div>


<style lang="scss">
    .root{
        width:100%;
        height:100%;
        background-color: cadetblue;

        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        justify-self: center;
    }
    
    .tableFrame{
        width:80%;
        height:80%;
        max-height: 70vh;
        overflow: auto;
        background-color: beige;
    }

    .dataTable{
        width:100%;
        height:100%;
        overflow: auto;
        background-color:coral;
        border-collapse: collapse;

        .tableHeader{
           position:sticky;
           top:0;
           background-color:crimson; 
        };

        .tableItems > .timestamp,.marketCap{
            background-color:rgb(253, 193, 171);
        }
    }
</style>