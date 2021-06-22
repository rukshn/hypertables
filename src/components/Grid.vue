<template>
  <div>
    <notification
      v-if="displayNotification"
      :message="notificationMessage"
      :title="notificationTitle"
      @confirm="fireConfirm"
      @cancel="fireCancel" />
    <multiline-input :currentValue="currentMultilineInput" v-if="multiline_input_popup" @save-multiline="saveMultiline" @close-multiline-popup="multiline_input_popup = false" />
    <div class="py-1 px-3 flex space-x-2 border-b border-gray-200">
      <input v-model="searchQuery" @change="search" type="text" class="border-gray-300 w-80 rounded-md border-2 focus:outline-none focus:border-indigo-500 px-2 py-1" placeholder="Search">
      <button class="bg-green-200 w-16 items-center flex justify-center px-1 py-1 rounded-md hover:bg-green-300 focus:outline-none">
        Save
      </button>
      <button @click="addRow" class="border-2 w-12 flex justify-center px-1 py-1 border-gray-300 rounded-md focus:bg-gray-100 hover:border-gray-400 focus:outline-none">
        <svg enable-background="new 0 0 80 80" height="24" id="Icons" version="1.1" viewBox="0 0 80 80" width="80px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="61,37 43,37 43,19 37,19 37,37 19,37 19,43 37,43 37,61 43,61 43,43 61,43 "/></svg>
      </button>
      <button class="border-2 w-12 flex justify-center px-1 py-1 border-gray-300 rounded-md focus:bg-gray-100 hover:border-gray-400 focus:outline-none">
        <svg enable-background="new 0 0 80 80" height="24" id="Icons" version="1.1" viewBox="0 0 80 80" width="24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M52,33v29H28V33H52 M57,28H23v39h34V28L57,28z"/><path d="M45,20v-3H35v3H20v5h40v-5H45z"/></g></svg>
      </button>
      <button @click="refresh" class="border-2 w-12 flex justify-center px-1 py-1 border-gray-300 rounded-md focus:bg-gray-100 hover:border-gray-400 focus:outline-none">
        <svg height="24" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M256,384.1c-70.7,0-128-57.3-128-128.1c0-70.8,57.3-128.1,128-128.1V84l96,64l-96,55.7v-55.8   c-59.6,0-108.1,48.5-108.1,108.1c0,59.6,48.5,108.1,108.1,108.1S364.1,316,364.1,256H384C384,327,326.7,384.1,256,384.1z"/></g></svg>
      </button>
    </div>
    <div class="grid_column flex">
      <div class="w-auto">
        <div class="bg-gray-100 px-5 max-h-8 text-left text-sm border-r border-b border-gray-300 select-none py-1">#</div>
        <div class="focus-within:bg-blue-100 px-5 space-x-4 focus-within:border-gray-200 py-1 border border-gray-100 min-w-full" v-for="(row, rowIndex) in structure.rows" :key="rowIndex">
          <input name="row_select" data-value="" @change="rowSelect(rowIndex)" class="focus:outline-none" type="checkbox" />
          <label for="row_select" class="text-sm">{{rowIndex}}</label>
        </div>
        <button @click="addRow" class="w-full max-h-8 py-1 px-4 flex bg-gray-100 border-gray-200 border focus:outline-none hover:bg-gray-200">
          <svg enable-background="new 0 0 80 80" height="24" id="Icons" version="1.1" viewBox="0 0 80 80" width="24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="61,37 43,37 43,19 37,19 37,37 19,37 19,43 37,43 37,61 43,61 43,43 61,43 "/></svg>
          Add
        </button>
      </div>
      <div v-for="(column, colIndex) in structure.columns" :key="colIndex" :ref="bindCol(colIndex)">
        <div v-if="column.visible">
          <div class="bg-gray-100 max-h-8 flex text-sm border-b border-r border-gray-300 text-center select-none py-1 px-2 w-full">
            <svg v-if="column.icon === 'calendar'" height="20" id="svg4050" version="1.1" viewBox="0 0 32 32.000001" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs4052"/><g id="layer1" transform="translate(0,-1020.3622)"><path d="M 6.09375 4 C 4.9414274 4 3.9980469 4.9434031 3.9980469 6.0957031 L 3.9980469 8.3652344 C 3.8597937 8.4494879 3.7284008 8.545258 3.609375 8.6542969 C 3.163242 9.0630969 2.8656464 9.7110531 3.0625 10.376953 L 4.9980469 16.923828 A 0.50005 0.50005 0 0 0 5.0039062 17.111328 L 3.0546875 25.654297 C 2.903844 26.315497 3.1891968 26.944262 3.6269531 27.351562 C 4.0647094 27.758863 4.6565934 28 5.2753906 28 L 26.724609 28 C 27.343406 28 27.935289 27.758863 28.373047 27.351562 C 28.810805 26.944262 29.096164 26.315497 28.945312 25.654297 L 26.994141 17.101562 A 0.50005 0.50005 0 0 0 27 16.931641 L 28.9375 10.376953 C 29.134344 9.7110531 28.836756 9.0630969 28.390625 8.6542969 C 28.270529 8.5442775 28.137695 8.4480532 27.998047 8.3632812 L 27.998047 6.0957031 C 27.998047 4.9434031 27.054666 4 25.902344 4 L 6.09375 4 z M 6.09375 5 L 25.902344 5 C 26.518011 5 26.998047 5.4801031 26.998047 6.0957031 L 26.998047 8.0253906 C 26.906946 8.0147689 26.817157 8 26.724609 8 L 5.2753906 8 C 5.1815325 8 5.0904108 8.0144698 4.9980469 8.0253906 L 4.9980469 6.0957031 C 4.9980469 5.4801031 5.478082 5 6.09375 5 z M 11.498047 6 A 0.5 0.5 0 0 0 10.998047 6.5 A 0.5 0.5 0 0 0 11.498047 7 A 0.5 0.5 0 0 0 11.998047 6.5 A 0.5 0.5 0 0 0 11.498047 6 z M 20.498047 6 A 0.5 0.5 0 0 0 19.998047 6.5 A 0.5 0.5 0 0 0 20.498047 7 A 0.5 0.5 0 0 0 20.998047 6.5 A 0.5 0.5 0 0 0 20.498047 6 z M 5.2753906 9 L 26.724609 9 C 27.06404 9 27.467839 9.162525 27.716797 9.390625 C 27.965755 9.618625 28.054067 9.83815 27.978516 10.09375 L 26.083984 16.5 L 24.498047 16.5 A 0.50005 0.50005 0 1 0 24.498047 17.5 L 26.058594 17.5 L 27.970703 25.876953 C 28.033573 26.152453 27.934073 26.393341 27.691406 26.619141 C 27.448744 26.844841 27.066676 27 26.724609 27 L 5.2753906 27 C 4.9333234 27 4.5512553 26.844841 4.3085938 26.619141 C 4.065932 26.393341 3.9664285 26.152453 4.0292969 25.876953 L 5.9414062 17.5 L 7.4980469 17.5 A 0.50005 0.50005 0 1 0 7.4980469 16.5 L 5.9160156 16.5 L 4.0214844 10.09375 C 3.9459304 9.83815 4.0342444 9.618625 4.2832031 9.390625 C 4.532162 9.162525 4.93596 9 5.2753906 9 z M 21.513672 10.994141 L 21.513672 10.996094 A 0.50005 0.50005 0 0 0 21.332031 11.023438 L 18.345703 12.023438 A 0.50005 0.50005 0 1 0 18.662109 12.970703 L 20.998047 12.189453 L 20.998047 24.507812 A 0.50005 0.50005 0 1 0 21.998047 24.507812 L 21.998047 11.507812 A 0.50005 0.50005 0 0 0 21.998047 11.492188 A 0.50005 0.50005 0 0 0 21.990234 11.408203 A 0.50005 0.50005 0 0 0 21.984375 11.378906 A 0.50005 0.50005 0 0 0 21.941406 11.265625 A 0.50005 0.50005 0 0 0 21.927734 11.240234 A 0.50005 0.50005 0 0 0 21.513672 10.994141 z M 14.472656 11 C 12.951125 11.025104 11.581223 12.067428 11.175781 13.595703 A 0.50005 0.50005 0 1 0 12.142578 13.851562 C 12.476422 12.593063 13.691746 11.814063 14.955078 12.039062 C 16.218412 12.264062 17.10071 13.42035 16.988281 14.71875 C 16.875844 16.01705 15.809956 17 14.527344 17 A 0.50005 0.50005 0 0 0 14.357422 17.027344 C 14.237973 17.016496 14.11955 17 13.998047 17 A 0.50004997 0.50004997 0 1 0 13.998047 18 C 15.212829 18 16.304645 18.731116 16.769531 19.853516 C 17.234402 20.976016 16.978116 22.263947 16.119141 23.123047 C 15.260151 23.982147 13.971931 24.238337 12.849609 23.773438 C 11.727274 23.308438 10.998021 22.216953 10.998047 21.001953 A 0.50004997 0.50004997 0 1 0 9.9980469 21.001953 C 9.998013 22.618453 10.973413 24.078666 12.466797 24.697266 C 13.960161 25.315866 15.683231 24.973178 16.826172 23.830078 C 17.969094 22.687078 18.311882 20.964203 17.693359 19.470703 C 17.365024 18.677975 16.795867 18.036418 16.095703 17.603516 C 17.129757 17.0693 17.877458 16.039313 17.984375 14.804688 C 18.140328 13.003688 16.900628 11.369888 15.130859 11.054688 C 14.909639 11.015287 14.690018 10.996414 14.472656 11 z " id="rect3486" style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#000000;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1.00000012;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" transform="translate(0,1020.3622)"/></g></svg>
            <svg v-if="column.icon === 'email'" height="20" id="svg4050" version="1.1" viewBox="0 0 32 32.000001" width="32" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs4052"/><g id="layer1" transform="translate(0,-1020.3622)"><path d="M 6 6.9980469 C 4.9006494 6.9980469 4 7.8986469 4 8.9980469 L 4 22.998047 C 4 24.097347 4.9006494 24.998047 6 24.998047 L 7.4238281 24.998047 A 0.50005 0.50005 0 0 0 7.5761719 24.998047 L 24.423828 24.998047 A 0.50005 0.50005 0 0 0 24.576172 24.998047 L 26 24.998047 C 27.099351 24.998047 28 24.097347 28 22.998047 L 28 8.9980469 C 28 7.8986469 27.099351 6.9980469 26 6.9980469 L 24.523438 6.9980469 L 7.5 6.9980469 L 6 6.9980469 z M 6 7.9980469 L 7.3222656 7.9980469 L 15.681641 14.882812 A 0.50005 0.50005 0 0 0 16.318359 14.882812 L 24.677734 7.9980469 L 26 7.9980469 C 26.562647 7.9980469 27 8.4353469 27 8.9980469 L 27 22.998047 C 27 23.560647 26.562647 23.998047 26 23.998047 L 25 23.998047 L 25 10.998047 A 0.50005 0.50005 0 0 0 24.181641 10.611328 L 16 17.349609 L 7.8183594 10.611328 A 0.50005 0.50005 0 0 0 7.4941406 10.498047 A 0.50005 0.50005 0 0 0 7 10.998047 L 7 23.998047 L 6 23.998047 C 5.4373528 23.998047 5 23.560647 5 22.998047 L 5 8.9980469 C 5 8.4353469 5.4373528 7.9980469 6 7.9980469 z M 8.8945312 7.9980469 L 23.105469 7.9980469 L 16 13.849609 L 8.8945312 7.9980469 z M 8 12.056641 L 15.681641 18.382812 A 0.50005 0.50005 0 0 0 16.318359 18.382812 L 24 12.056641 L 24 23.998047 L 8 23.998047 L 8 12.056641 z " id="rect4882" style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;direction:ltr;block-progression:tb;writing-mode:lr-tb;baseline-shift:baseline;text-anchor:start;white-space:normal;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4.0999999;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate" transform="translate(0,1020.3622)"/></g></svg>
            <svg v-if="column.icon === 'link'" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M7,17A5,5,0,0,1,7,7h3a5,5,0,0,1,5,5,1,1,0,0,1-2,0,3,3,0,0,0-3-3H7a3,3,0,0,0,0,6,1,1,0,0,1,0,2Z" fill="#464646"/><path d="M17,17H14a5,5,0,0,1-5-5,1,1,0,0,1,2,0,3,3,0,0,0,3,3h3a3,3,0,0,0,0-6,1,1,0,0,1,0-2,5,5,0,0,1,0,10Z" fill="#464646"/></svg>
            <svg v-if="column.type === 'multiline'" fill="none" height="20" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H20M4 12H12M4 18H20" stroke="#4A5568" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
            {{column.title}}

            <button :ref="bindColMenuButton(colIndex)" @click="toggleColumnMenuPopover(colIndex)" class="w-1/12 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>

            <div :ref="bindColMenu(colIndex)"
              class="w-64 text-gray-50 hidden bg-gray-700 border border-gray-200 z-50 leading-normal text-sm max-w-xs text-left no-underline break-words">
              <div>
                <button @click="fireNotification('Are you sure to rename the column?', 'Renaming the column may effect other tables reffering to it', colIndex)" class="px-3 text-left py-1 w-full focus:outline-none hover:bg-gray-600">Rename column</button>
                <button @click="hideColumn(colIndex)" class="px-3 text-left py-1 w-full focus:outline-none hover:bg-gray-600">Hide column</button>
                <button class="px-3 text-left py-1 w-full focus:outline-none hover:bg-gray-600">Delete column</button>
              </div>
            </div>
          </div>

          <div
            class="w-full"
            :class="{'flex': colIndex === 0}"
            v-for="(row, rowIndex) in structure.rows"
            :key="rowIndex">

            <input
              v-if="column.type === 'string'"
              :readonly="disabled"
              @keydown="enable"
              @keydown.down.exact="cellDown"
              @keydown.up.exact="cellUp"
              @keydown.left.exact="cellLeft"
              @keydown.right.exact="cellRight"
              @keydown.enter.exact="enterCell"
              @keydown.tab.exact="tabCell"
              @click="enable"
              @focus="changeActiveCell(colIndex, rowIndex)"
              :data-cell-type="column.type"
              :ref="bindRow(rowIndex, colIndex)"
              :data-col="colIndex"
              :data-row="rowIndex"
              type="text"
              class="focus:outline-none focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 min-w-full" />

            <div v-if="column.type === 'date'" class="flex">
              <input readonly
                @keydown.down.exact="cellDown"
                @keydown.up.exact="cellUp"
                @keydown.left.exact="cellLeft"
                @keydown.right.exact="cellRight"
                @keydown.enter.exact="enterCell"
                @keydown.tab.exact="tabCell"
                @focus="changeActiveCell(colIndex, rowIndex)"
                :data-cell-type="column.type"
                :ref="bindRow(rowIndex, colIndex)"
                :data-col="colIndex"
                :data-row="rowIndex"
                type="text"
                class="focus:outline-none focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 w-5/6" />

              <DatePicker is-fill color="indigo" class="bg-green-50 border border-gray-100 text-gray-700 focus:outline-none w-1/6" ref="gridCalander" v-model="date" @dayclick="setDate(colIndex, rowIndex)">
              <template v-slot="{ togglePopover }">
              <button @click="togglePopover()" class="focus:outline-none flex flex-col items-center justify-center align-middle item-center w-full h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  class="w-4 h-4 fill-current"
                >
                  <path
                    d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
                  ></path>
                </svg>
              </button>
              </template>
              </DatePicker>

              <div :ref="bindPopup(rowIndex, colIndex)"
                class="space-x-2 w-1/6 space-y-2 select hidden absolute bg-gray-50 py-2 px-2">
                <DatePicker ref="gridCalander" v-model="date" @dayclick="setDate" />
              </div>
            </div>

            <div v-if="column.type === 'multiline'" class="flex">
              <input readonly
                @keydown.down.exact="cellDown"
                @keydown.up.exact="cellUp"
                @keydown.left.exact="cellLeft"
                @keydown.right.exact="cellRight"
                @keydown.enter.exact="enterCell"
                @keydown.tab.exact="tabCell"
                @focus="changeActiveCell(colIndex, rowIndex)"
                :data-cell-type="column.type"
                :ref="bindRow(rowIndex, colIndex)"
                :data-col="colIndex"
                :data-row="rowIndex"
                type="text"
                class="focus:outline-none focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 w-5/6" />

              <div class="bg-green-50 border border-gray-100 text-gray-700 w-1/6">
                <button @click="showMultilineInput(colIndex, rowIndex)" class="focus:outline-none flex flex-col items-center justify-center align-middle item-center w-full h-full">
                  <svg height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title/><path d="M4,7H2V4A2,2,0,0,1,4,2H7V4H4Z" fill="#464646"/><path d="M22,7H20V4H17V2h3a2,2,0,0,1,2,2Z" fill="#464646"/><path d="M7,22H4a2,2,0,0,1-2-2V17H4v3H7Z" fill="#464646"/><path d="M20,22H17V20h3V17h2v3A2,2,0,0,1,20,22Z" fill="#464646"/><path d="M8,9a1,1,0,0,1-.71-.29l-1-1A1,1,0,0,1,7.71,6.29l1,1a1,1,0,0,1,0,1.42A1,1,0,0,1,8,9Z" fill="#464646"/><path d="M16,9a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l1-1a1,1,0,1,1,1.42,1.42l-1,1A1,1,0,0,1,16,9Z" fill="#464646"/><path d="M7,18a1,1,0,0,1-.71-.29,1,1,0,0,1,0-1.42l1-1a1,1,0,0,1,1.42,1.42l-1,1A1,1,0,0,1,7,18Z" fill="#464646"/><path d="M17,18a1,1,0,0,1-.71-.29l-1-1a1,1,0,0,1,1.42-1.42l1,1a1,1,0,0,1,0,1.42A1,1,0,0,1,17,18Z" fill="#464646"/></svg>
                </button>
              </div>
            </div>

            <div v-if="column.type === 'number'">
              <input
              :readonly="disabled"
              @keydown="enable"
              @keydown.down.exact="cellDown"
              @keydown.up.exact="cellUp"
              @keydown.left.exact="cellLeft"
              @keydown.right.exact="cellRight"
              @keydown.enter.exact="enterCell"
              @keydown.tab.exact="tabCell"
              @click="enable"
              @focus="changeActiveCell(colIndex, rowIndex)"
              :data-cell-type="column.type"
              :ref="bindRow(rowIndex, colIndex)"
              :data-col="colIndex"
              :data-row="rowIndex"
              type="number"
              class="focus:outline-none text-right focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 min-w-full" />
            </div>

            <div v-if="column.type ==='enum'">
              <input :readonly="disabled"
              @keydown="enable"
              @keydown.down.exact="cellDown"
              @keydown.up.exact="cellUp"
              @keydown.left.exact="cellLeft"
              @keydown.right.exact="cellRight"
              @keydown.enter.exact="enterCell"
              @keydown.tab.exact="tabCell"
              @click="enable"
              @focus="changeActiveCell(colIndex, rowIndex)"
              :data-cell-type="column.type"
              :ref="bindRow(rowIndex, colIndex)"
              :data-col="colIndex"
              :data-row="rowIndex"
              type="text"
              class="focus:outline-none focus:bg-blue-100 focus:border-gray-200 py-1 px-1 border border-gray-100 min-w-full" />

              <div :ref="bindPopup(rowIndex, colIndex)"
                class="space-x-2 w-1/6 space-y-2 select hidden absolute bg-gray-50 py-2 px-2">
                <button
                  v-for="(value, index) in column.value"
                  :key="index"
                  @click="setValue"
                  :data-value="value"
                  class="rounded-2xl text-sm select-none focus:outline-none bg-green-200 py-1 px-2">{{value}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/12">
        <div class="max-h-8 text-sm bg-gray-100 hover:bg-gray-300 border-b border-r border-gray-300 text-center select-none py-1 px-2 w-full">
          <button @click="toggleCreateTabPopover" ref="btnNewColumn" class="w-full focus:outline-none">+</button>
        </div>

        <div ref="newColumnRef" v-bind:class="{'hidden': !showCreateTabPopover, 'block': showCreateTabPopover}"
            class="w-96 bg-white border border-gray-200 border-0 block z-50 leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg">
          <div>
            <div class="bg-blue-100 py-2 px-3 opacity-75 font-semibold border-b border-solid uppercase rounded-t-lg">
              select a column type
            </div>
            <div class="py-2 px-2 space-y-2">
              <div class="field">
                <div class="control">
                  <input type="text" placeholder="Column title" class="py-2 px-2 rounded-md w-full border-2 border-gray-400 outline-none focus:border-indigo-500 focus:bg-gray-100" v-model="newColumnName">
                </div>
              </div>

              <div class="dropdown flex">
                <input placeholder="Select a column type" v-model="columnType" type="text" disabled class="rounded-l-md flex-grow py-2 px-2 border border-gray-300">
                <button @click="showColumnTypeDropdown = true" class="bg-gray-200 focus:outline-none hover:bg-gray-300 w-1/6 px-2 py-2 rounded-r-md">
                  <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
              <div v-if="showColumnTypeDropdown === true" class="border border-gray-300 rounded-md">
                <button @click="showColumnCreator('string')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Signe line text</button>
                <button @click="showColumnCreator('multiline')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Multiline text</button>
                <button @click="showColumnCreator('date')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Date</button>
                <button @click="showColumnCreator('enum')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Select</button>
                <button @click="showColumnCreator('email')" class="px-3 text-left py-2 w-full hover:bg-blue-200 text-gray-700">Email Address</button>
              </div>

              <div v-if="showNSLC" class="py-2 space-y-2">
                <p class="text-gray-500">
                  Single line of text.
                </p>
                <div class="space-x-2 py-2">
                  <button @click="createColumn('string')" class="bg-blue-500 rounded-md text-white px-3 py-2 hover:bg-blue-600 focus:outline-none">Create Column</button>
                  <button @click="toggleCreateTabPopover" class="focus:outline-none">Cancel</button>
                </div>
              </div>

              <div v-if="showNewDateColumn">
                <p class="text-gray-500">
                  A date picker where you can select a date.
                </p>
                <div class="space-x-2 py-2">
                  <button @click="createColumn('date')" class="bg-blue-500 rounded-md text-white px-3 py-2 hover:bg-blue-600 focus:outline-none">Create Column</button>
                  <button @click="toggleCreateTabPopover" class="focus:outline-none">Cancel</button>
                </div>
              </div>

              <div v-if="showNewMultilineColumn">
                <p class="text-gray-500">
                  A multiline text input field.
                </p>

                <div class="space-x-2 py-2">
                  <button @click="createColumn('multiline')" class="bg-blue-500 rounded-md text-white px-3 py-2 hover:bg-blue-600 focus:outline-none">Create Column</button>
                  <button @click="toggleCreateTabPopover" class="focus:outline-none">Cancel</button>
                </div>
              </div>

              <div v-if="showNewEmailColumn">
                <p class="text-gray-500">
                  A valid email address (e.g. jhon@example.com).
                </p>
                <div class="space-x-2 py-2">
                  <button @click="createColumn('email')" class="bg-blue-500 rounded-md text-white px-3 py-2 hover:bg-blue-600 focus:outline-none">Create Column</button>
                  <button @click="toggleCreateTabPopover" class="focus:outline-none">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import MultilineInput from './elementals/Multilineinput.vue'
  import { DatePicker } from 'v-calendar';
  import { createPopper } from "@popperjs/core"
  import Notification from './Notification.vue'

  export default defineComponent({
    name: 'Grid',
    components: {
      DatePicker,
      MultilineInput,
      Notification
    },

    props: ['tables', 'activeTable'],

    data() {
      const tableName:string = ""
      const host = import.meta.env.VITE_DB_HOST

      const activeCell: {col: number, row:number } = {
        row: 0,
        col: 0
      }

      const selectedRows: number[] = []

      // Notification related values
      const notificationMessage: string = ""
      const notificationTitle: string = ""
      const displayNotification: boolean = false
      const notificationEvent: string = ""
      const tempCol: number = 0
      const tempRow: number = 0

      // popover related values
      const showCreateTabPopover:boolean = false
      const showNSLC:boolean = false
      const newColumnName:string = ""
      const showColumnTypeDropdown:boolean = false
      const columnType:string = ""
      const showNewEmailColumn:boolean = false
      const showNewDateColumn:boolean = false
      const showNewMultilineColumn:boolean = false
      const multiline_input_popup:boolean = false
      const currentMultilineInput:string = ""

      const date:Date = new Date()

      const structure: {
        rows: number,
        columns: Array <{
          title: string,
          type: string,
          value?: String[]
          icon?: string,
          isPrimaryKey: boolean,
          key?: string,
          visible: boolean,
        }>
      } = {
        rows: 1,
        columns: []
      }

      const disabled: boolean = true
      const searchQuery:string = ""

      return {
        structure,
        disabled,
        activeCell,
        date,
        showCreateTabPopover,
        showNSLC,
        newColumnName,
        showColumnTypeDropdown,
        columnType,
        showNewEmailColumn,
        showNewDateColumn,
        showNewMultilineColumn,
        multiline_input_popup,
        currentMultilineInput,
        selectedRows,
        searchQuery,
        tableName,
        host,
        notificationMessage,
        notificationTitle,
        displayNotification,
        notificationEvent,
        tempCol,
        tempRow
      }
    },

    mounted() {
      const activeCell = this.activeCell
      if(this.$refs[`col-${activeCell.col}-row-${activeCell.row}`]) (this.$refs[`col-${activeCell.col}-row-${activeCell.row}`] as HTMLElement).focus()
    },

    watch: {
      activeTable(newIndex:string) {
        this.updateColumns()
      }
    },

    computed: {
      emitConfirm() {
        return true
      },
      emitCancel() {
        return false
      },
    },

    methods: {
      search() {},
      addRow() {
        this.structure.rows += 1
      },
      hideColumn(colIndex: number) {
        this.structure.columns[colIndex].visible = false
      },
      updateColumns() {
        const _this = this
        this.tableName = this.activeTable
        var columnStructure: Array <{
          title: string,
          type: string,
          value?: String[]
          icon?: string,
          isPrimaryKey: boolean,
          key?: string,
          visible: boolean
        }> = []

        fetch(`${this.host}/_ht/get-table-structure/${this.tableName}`)
        .then((response) => response.json())
        .then((tableColumns) => {
          tableColumns.forEach((column:any)  => {
            let isPrimaryKey = false
            let type
            // I feel like keeping sepeate type variable and mapping the type value to own HT type is better to deal with different types in different database models
            // Like Laravel schmea type
            // https://laravel.com/docs/8.x/migrations#available-column-types
            // But this might lead to condition hell, but i will look into that later

            if (column.Key === 'PRI') {
              isPrimaryKey = true
            }
            if (column.Type.includes('varchar')) {
              type = 'string'
            } else if (column.Type === 'datetime') {
              type = 'date'
            } else if (column.Type === 'text') {
              type = 'multiline'
            } else if (column.Type.includes('int')) {
              type = 'number'
            } else {
              type = 'string'
            }

            columnStructure.push({
              title: column.Field,
              type: type,
              isPrimaryKey: isPrimaryKey,
              visible: true
            })

          })
          _this.structure.columns = columnStructure
        })
      },

      refresh() {

      },

      rowSelect(rowIndex:number) {
        const index:number = this.selectedRows.indexOf(rowIndex)
        if (index > -1) {
          this.selectedRows.splice(index, 1)
        } else {
          this.selectedRows.push(rowIndex)
        }
      },

      saveMultiline(e:string) {
        const activeCell:HTMLInputElement = this.$refs[`col-${this.activeCell.col}-row-${this.activeCell.row}`] as HTMLInputElement
        activeCell.setAttribute('data-value', e)
        activeCell.value = e.substr(0,10) + '...'
      },

      fireNotification(title: string, message: string, column: number, row: number) {
        this.displayNotification = true
        this.notificationMessage = message
        this.notificationTitle = title
        this.tempCol = column
        this.tempRow = row
        this.notificationEvent = "renameColumn"
        this.notificationTitle = title
        this.notificationMessage = message
        const popover:HTMLElement = this.$refs[`colMenu${column}`] as HTMLElement
        popover.classList.remove('block')
        popover.classList.add('hidden')
      },

      fireConfirm(event: string) {
        if (event === 'renameColumn') {
          this.displayNotification = false
          this.renameColumnMakeRequest(this.tempCol)
        }
      },

      fireCancel() {
        this.displayNotification = false
      },

      renameColumnMakeRequest(colIndex:number) {
        const promptBox:any = prompt("New Column Name?")
        if (promptBox.length === 0) return
        const oldName: string = this.structure.columns[colIndex].title
        this.structure.columns[colIndex].title = promptBox
        fetch(`${this.host}/_ht/rename-column`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            tableName: this.activeTable,
            oldName: oldName,
            newName: promptBox
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
      },

      deleteColumnMakeRequest(colIndex:number) {
        const columnName: string = this.structure.columns[colIndex].title
        fetch(`${this.host}/_ht/delete-column`, {
          method: 'POSt',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            tableName: this.activeTable,
            columnName: columnName
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
      },

      createColumnMakeRequest(tableName:string, columnName:string, dataType:string) {
        let columnDataType: string = 'varchar(255)'
        let filteredColumnName = columnName.substr(0, 63)
        if (dataType === 'string' || dataType === 'email' || dataType === 'phone') {
          columnDataType = 'varchar(255)'
        } else if (dataType === 'multiline' || dataType === 'link') {
          columnDataType = 'text'
        } else if (dataType === 'date') {
          columnDataType = 'date'
        } else if (dataType === 'timestamp') {
          columnDataType = 'timestamp'
        }

        fetch(`${this.host}/_ht/create-column`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            tableName: tableName,
            columnName: columnName,
            dataType: columnDataType
          })
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
        })
      },

      createColumn(type:string) {
        if (type === 'string') {
          const newColumn: {title: string, type: string, isPrimaryKey: boolean, visible: boolean} = {
            title: this.newColumnName || 'Column' + this.structure.columns.length + 1,
            type: 'string',
            isPrimaryKey: false,
            visible: true
          }
          this.structure.columns.push(newColumn)
          const activeTable = this.activeTable
          this.createColumnMakeRequest(activeTable, newColumn.title, newColumn.type)
        } else if (type === 'email') {
          const newColumn: {title: string, type: string, icon: string, isPrimaryKey: boolean, visible: boolean} = {
            title: this.newColumnName || 'Email' + this.structure.columns.length + 1,
            type: 'string',
            icon: 'email',
            isPrimaryKey: false,
            visible: true
          }
          this.structure.columns.push(newColumn)
          const activeTable = this.activeTable
          this.createColumnMakeRequest(activeTable, newColumn.title, newColumn.type)
        } else if (type === 'date') {
          const newColumn: {title: string, type: string, icon: string, isPrimaryKey: boolean, visible: boolean} = {
            title: this.newColumnName || 'Date' + this.structure.columns.length + 1,
            type: 'date',
            icon: 'calendar',
            isPrimaryKey: false,
            visible: true
          }
          this.structure.columns.push(newColumn)
          const activeTable = this.activeTable
          this.createColumnMakeRequest(activeTable, newColumn.title, newColumn.type)
        } else if (type === 'multiline') {
          const newColumn: {title: string, type: string, icon: string, isPrimaryKey:boolean, visible: boolean} = {
            title: this.newColumnName || 'Text' + this.structure.columns.length + 1,
            type: 'multiline',
            icon: 'multiline',
            isPrimaryKey: false,
            visible: true
          }
          this.structure.columns.push(newColumn)
          const activeTable = this.activeTable
          this.createColumnMakeRequest(activeTable, newColumn.title, newColumn.type)
        }

        this.newColumnName = ''
        this.showCreateTabPopover = false
        this.showNSLC = false
        this.showNewDateColumn = false
        this.showNewEmailColumn = false
      },

      showMultilineInput(colIndex:number, rowIndex:number) {
        this.activeCell.col = colIndex
        this.activeCell.row = rowIndex
        const activeCell:HTMLInputElement = this.$refs[`col-${colIndex}-row-${rowIndex}`] as HTMLInputElement
        const currentMultilineInput:string = activeCell.getAttribute('data-value') as string
        this.currentMultilineInput = currentMultilineInput
        this.multiline_input_popup = true
      },
      showColumnCreator(type:string) {
        this.showColumnTypeDropdown = false
        if (type === 'string') {
          this.showNSLC = true
          this.showNewEmailColumn = false
          this.showNewDateColumn = false
          this.showNewMultilineColumn = false
          this.columnType = "Single text"
        } else if (type === 'email') {
          this.showNewEmailColumn = true
          this.showNSLC = false
          this.showNewDateColumn = false
          this.showNewMultilineColumn = false
          this.columnType = "Email"
        } else if (type === 'date') {
          this.columnType = 'Date'
          this.showNewDateColumn = true
          this.showNSLC = false
          this.showNewEmailColumn = false
          this.showNewMultilineColumn = false
        } else if (type === 'multiline') {
          this.columnType = "Multiline text"
          this.showNSLC = false
          this.showNewEmailColumn = false
          this.showNewDateColumn = false
          this.showNewMultilineColumn = true
        }
      },
      toggleColumnMenuPopover(index:number) {
        const popover:HTMLElement = this.$refs[`colMenu${index}`] as HTMLElement
        if(popover.classList.contains('block')) {
          popover.classList.remove('block')
          popover.classList.add('hidden')
        } else {
          popover.classList.remove('hidden')
          popover.classList.add('block')
          const button:HTMLElement = this.$refs[`colMenuButton${index}`] as HTMLElement
          createPopper(button, popover, { placement: 'bottom',
            modifiers: [
              {
                name: 'offset',
                options: {
                  offset: () => [40]
                }
              }
            ]
          })
        }
      },
      toggleCreateTabPopover() {
        if (this.showCreateTabPopover) {
          this.showCreateTabPopover = false
        } else {
          this.showCreateTabPopover = true
          const newColumnButton:HTMLButtonElement = this.$refs['btnNewColumn'] as HTMLButtonElement
          const newColumnPopover:HTMLElement = this.$refs['newColumnRef'] as HTMLElement
          createPopper(newColumnButton, newColumnPopover, {placement: 'bottom',
          modifiers: [
              {
                name: 'offset',
                options: {
                  offset: () => [40]
                }
              }
            ]
          })
        }
      },
      bindColMenu(index:number) {
        return `colMenu${index}`
      },
      bindColMenuButton(index:number) {
        return `colMenuButton${index}`
      },
      bindCol(n: number) {
        return `col${n}`
      },
      bindRow(n: number, col: number) {
        return `col-${col}-row-${n}`
      },
      bindPopup(rowIndex: number, colIndex: number) {
        return `popup-col-${colIndex}-row-${rowIndex}`
      },
      enterCell(e: any) {
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = +row + 1
        const newCol: number = 0
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
        }
      },
      tabCell(e: any) {
        this.disabled = true
        e.preventDefault()
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = row
        const newCol: number = +col + 1

        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
          this.changeActiveCell(newCol, newRow)
        }
      },
      cellDown(e: any) {
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = +row + 1
        const newCol: number = col
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref])(this.$refs[ref] as HTMLInputElement).focus()
      },
      cellUp(e: any) {
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = +row - 1
        const newCol: number = col
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
        }
      },
      cellLeft(e: any) {
        if (!this.disabled) return
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = row
        const newCol: number = +col - 1
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
        }

      },
      cellRight(e: any) {
        if (!this.disabled) return
        e.preventDefault()
        this.disabled = true
        const col: number = e.target.getAttribute('data-col')
        const row: number = e.target.getAttribute('data-row')

        const newRow: number = row
        const newCol: number = +col + 1
        const ref: string = `col-${newCol}-row-${newRow}`
        if (this.$refs[ref]) {
          (this.$refs[ref] as HTMLInputElement).focus()
          this.changeActiveCell(newCol, newRow)
        }

      },
      enable(e:any) {
        this.showPopup(this.activeCell.col, this.activeCell.row)
        return this.disabled = false
      },
      showPopup(colIndex:number, rowIndex:number) {
        const cell:HTMLElement = this.$refs[`col-${colIndex}-row-${rowIndex}`] as HTMLElement
        if (this.disabled === false && (cell.getAttribute('data-cell-type') === 'enum')) {
          const popup:HTMLElement = this.$refs[`popup-col-${colIndex}-row-${rowIndex}`] as HTMLElement
          if(popup.classList.contains('hidden')) popup.classList.remove('hidden')
        }
      },
      hidePopup(colIndex:number, rowIndex:number) {
        const popup:HTMLElement = this.$refs[`popup-col-${colIndex}-row-${rowIndex}`] as HTMLElement
        if(!popup.classList.contains('hidden')) popup.classList.add('hidden')
      },
      setValue(e:any) {
        const row:number = this.activeCell.row
        const col:number = this.activeCell.col
        const cell:HTMLInputElement = this.$refs[`col-${col}-row-${row}`] as HTMLInputElement
        cell.value = e.target.getAttribute('data-value')
        this.hidePopup(col, row)
      },
      setDate(colIndex:number, rowIndex:number) {
        // this.hidePopup(col,row)
        const cell:HTMLInputElement = this.$refs[`col-${colIndex}-row-${rowIndex}`] as HTMLInputElement
        cell.value = this.date.toDateString()
        cell.setAttribute('data-value', this.date.toJSON().slice(0, 19).replace('T', ' '))
      },
      changeActiveCell(colIndex:number, rowIndex:number) {
        const oldActiveCell = this.activeCell
        const cell:HTMLElement = this.$refs[`col-${oldActiveCell.col}-row-${oldActiveCell.row}`] as HTMLElement
        if (cell.getAttribute('data-cell-type') === 'enum') {
          this.hidePopup(oldActiveCell.col, oldActiveCell.row)
        }
        this.activeCell = {col: colIndex, row: rowIndex}
        this.showPopup(colIndex, rowIndex)
      }
    }
  })
</script>

<style>
  .top-100 {
    top: 100%
  }

  .bottom-100 {
    bottom: 100%
  }

  .max-h-select {
    max-height: 300px;
  }
</style>