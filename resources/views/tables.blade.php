@extends('layouts.app')

@section('content')
{{-- @php
    print_r($List4);
@endphp --}}
  <!-- start page title -->
  <div class="text-center" style="background-color: #7e94ac94;" >
    <div class="spinner-border avatar-lg text-primary" role="status" style="position: absolute; top: 50%; left: 50%; margin: -1.5rem 0 0 -1.5rem;  display: none;"aria-labelledby="danger-header-modalLabel" ></div>
</div>
  <div class="container-fluid">
  @if (session('success'))
 
  <div >
    <div  id="success-alert-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
            <div class="modal-content modal-filled bg-success">
                <div class="modal-body p-4">
                    <div class="text-center">
                        <i class="dripicons-checkmark h1"></i>
                        <h4 class="mt-2">Well Done!</h4>
                        <p class="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                        <button type="button" class="btn btn-light my-2" data-bs-dismiss="modal">Continue</button>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    
  </div>
  @endif
  <div class="row">
    <div class="col-12">
        <div class="page-title-box">
            <div class="page-title-right">
                 <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item"><a href="javascript: void(0);">Annuaire Statistique</a></li>
                    <li class="breadcrumb-item"><a href="javascript: void(0);">Getion</a></li>
                    <li class="breadcrumb-item "><a href="javascript: void(0);">import</a></li>
                    <li class="breadcrumb-item active">Etudiants</a></li>

                </ol>
            </div>
            <h4 class="page-title">Etudiants</h4>
        </div>
    </div>
</div>
<!-- end page title -->
<section class="d-flex">

<div class="col-xxl-3 col-lg-4 p-2">
    <div class="pe-xl-3">
        <!-- start search box -->
        <div class="app-search">
            <form>
                <div class="mb-1 position-relative">
                    <input type="search" class="form-control m-1 " id="search" placeholder="Choisir l'institution ...">
                    <span class="mdi mdi-magnify search-icon p-1 "></span>
                </div>
            </form>
        </div>
        <!-- end search box -->

        <div class="row">
            <div class="col">
                <div data-simplebar="" style="max-height: 350px;">
                    <div class="p-2">
                        <div class="row " >
                            <div class="col bt-3 ">
                                <ul  class="list-unstyled " id="list">
                                    @foreach($List3 as $e)
                                     <li class="border-bottom m-2 p-2"><input type="radio" id="customRadiocolor1" name="myCheckboxes" value="{{ $e->id }}" class="form-check-input ml-2  "  > {{ $e->abrev  }}</li> 
                                    @endforeach
                                </ul>

                            </div>


                        </div> <!-- end row-->
 </div>
 </div>

                  </div>

<!-- end projects -->
<form action="">
<div class="fallback">
    {{-- <input name="file" type="file" id="fileInput" multiple /> --}}
{{-- <input type="file"  id="fileInput"/> --}}

</div>
{{-- </form> --}}
<br>
<div class='file-input ' id='cache_file'>
    <input type='file' id="fileInput">
    <span class='button '>Choose</span>
    <span class='label' data-js-label>No file selected</label>
</div>
</form>
{{-- <form action="/" method="post" class="dropzone" id="myAwesomeDropzone" data-plugin="dropzone" data-previews-container="#file-previews"
data-upload-preview-template="#uploadPreviewTemplate"> --}}
{{-- <div class="fallback"> --}}
    {{-- <input name="file" type="file" id="fileInput" multiple /> --}}
    {{-- <input type="file" id="fileInput"/> --}}
{{-- </div> --}}

{{-- <div class="dz-message needsclick">
    <i class="h1 text-muted dripicons-cloud-upload"></i>
    <h3 class="text-muted font-13">Déposez les fichiers ici ou cliquez pour télécharger.</h3> --}}
    {{-- <span class="text-muted font-13">(This is just a demo dropzone. Selected files are
        <strong>not</strong> actually uploaded.)</span> --}}
{{-- </div> --}}
{{-- </form> --}}

<!-- Preview -->
<div class="dropzone-previews mt-3" id="file-previews"></div>

<!-- file preview template -->
<div class="d-none" id="uploadPreviewTemplate">
<div class="card mt-1 mb-0 shadow-none border">
    <div class="p-2">
        <div class="row align-items-center">
            <div class="col-auto">
                <img data-dz-thumbnail src="#" class="avatar-sm rounded bg-light" alt="">
            </div>
            <div class="col ps-0">
                <a href="javascript:void(0);" class="text-muted fw-bold" data-dz-name></a>
                <p class="mb-0" data-dz-size></p>
            </div>
            <div class="col-auto">
                <!-- Button -->
                <a href="" class="btn btn-link btn-lg text-muted" data-dz-remove>
                    <i class="dripicons-cross"></i>
                </a>
            </div>
        </div>
    </div>
</div>
</div>
</div>
    </div>
</div>
<div class="card-body">
    <div class="dropdown float-end">
        <a href="#" class="dropdown-toggle arrow-none card-drop" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="mdi mdi-dots-vertical"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item">Export</a>
            <!-- item-->
            {{-- <a href="javascript:void(0);" class="dropdown-item"></a>
            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item"></a>
            <!-- item-->
            <a href="javascript:void(0);" class="dropdown-item"></a> --}}
        </div>
    </div>
    <h4 class="header-title m-3">Traitement du fichier avant l'import</h4>
    <div id="tableContainer"></div>
    <div id="average-sales1" class="apex-charts mb-4 mt-4" data-colors="#727cf5,#0acf97,#fa5c7c,#ffbc00"></div>


    <div class="chart-widget-list " id="labelse">
    </div>
    <div id="aler" ></div>
    <form action="{{ route('test') }}" method="POST" id="formId">
      @csrf
        <div id="sub">
    </div>
</form>
<div id="sub2">
</div>
</div>


<!-- Danger Header Modal -->
<div id="danger-header-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="danger-header-modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header modal-colored-header bg-danger">
                <h4 class="modal-title" id="danger-header-modalLabel">Modal Heading</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h5 class="mt-0">error of eteblisment</h5>
                {{-- <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p> --}}
                <p> you haven't chosen any eteblissment so please use one </p>
            </div>
            {{-- <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger">Save changes</button>
            </div> --}}
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="warning-alert-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body p-4">
                <div class="text-center">
                    <i class="dripicons-warning h1 text-warning"></i>
                    <h4 class="mt-2">Incorrect Information</h4>
                    <p class="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                    <button type="button"  id="kk" class="btn btn-warning my-2" data-bs-dismiss="modal">Continue</button>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->
<div id="danger-alert-modal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content modal-filled bg-danger">
            <div class="modal-body p-4">
                <div class="text-center">
                    <i class="dripicons-wrong h1"></i>
                    <h4 class="mt-2">Oh snap!</h4>
                    <p class="mt-3">Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.</p>
                    <button type="button" id="jj" class="btn btn-light my-2" data-bs-dismiss="modal">Continue</button>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

<div id="info-header-modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="info-header-modalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header modal-colored-header bg-info">
                <h4 class="modal-title" id="info-header-modalLabel">Modal Heading</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <h5 class="mt-0">Info Background</h5>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            </div>
            {{-- <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-info">Save changes</button>
            </div> --}}
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->                                             
                                             
</section>                     
  </div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.1/xlsx.core.min.js"></script>
<!-- end demo js-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.3/jquery.min.js" integrity="sha512-STof4xm1wgkfm7heWqFJVn58Hm3EtS31XFaagaa8VMReCXAkQnJZ+jEy8PCC/iT18dFy95WcExNHFTqLyp72eQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

        <script>
          $(document).ready(function(){
  $('#loading-spinner').fadeIn();
});

$(window).on('load', function(){
  $('#loading-spinner').fadeOut(5000);
});

           
        </script>
<script >
    $('#search').keyup(function(){
      var value= $(this).val().toLowerCase();
      $('#list li').each(function(){
        var search = $(this).text().toLowerCase();
        if(search.indexOf(value)> -1){
            $(this).show();
        }
        else{
           $(this).hide();
        }
      })
    });
</script>
<script src="assets/js/vendor/dropzone.min.js"></script>
<!-- init js -->
<script src="assets/js/ui/component.fileupload.js"></script>
<script>

</script>
<script>
    jsonData = @json($data);
    window.jsonData=jsonData;
    // console.log(jsonData);
    $(document).ready(function(){
    setTimeout(function(){
        $("#success-alert-modal").modal("show");
    }, 100);
});


</script>
<script src="assets/js/pages/rens.js">

</script>
<script>
   var inputs = document.querySelectorAll('.file-input')

for (var i = 0, len = inputs.length; i < len; i++) {
  customInput(inputs[i])
}

function customInput (el) {
  const fileInput = el.querySelector('[type="file"]')
  const label = el.querySelector('[data-js-label]')
  
  fileInput.onchange =
  fileInput.onmouseout = function () {
    if (!fileInput.value) return
    
    var value = fileInput.value.replace(/^.*[\\\/]/, '')
    el.className += ' -chosen'
    label.innerText = value
  }
}
</script>

       @endsection
