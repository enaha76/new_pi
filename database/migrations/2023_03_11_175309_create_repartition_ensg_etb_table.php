<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('repartition_ensg_etb', function (Blueprint $table) {
            $table->bigInteger('id', true);
            $table->string('etablissements');
            $table->string('annee_scolaire');
            $table->integer('nb1');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('repartition_ensg_etb');
    }
};
