function temp_startjqt1()
{
	window.jQT = new $.jQTouch({
				icon : 'jqtouch.png',
				icon4 : 'jqtouch4.png',
				addGlossToIcon : false,
				startupScreen : 'jqt_startup.png',
				statusBar : 'black',
				preloadImages : ['src/jqtouch/img/activeButton.png', 'src/jqtouch/img/back_button.png', 'src/jqtouch/img/back_button_clicked.png', 'src/jqtouch/img/blueButton.png', 'src/jqtouch/img/button.png', 'src/jqtouch/img/button_clicked.png', 'src/jqtouch/img/grayButton.png', 'src/jqtouch/img/greenButton.png', 'src/jqtouch/img/redButton.png', 'src/jqtouch/img/whiteButton.png', 'src/jqtouch/img/loading.gif']
			});
	
}

function temp_startjqt2()
{	
/**
 *
 * Determines which scope is currently active, given a JQT pane navigation.
 * 
 * !! Every JQT screen panel MUST have the css class 'jqtAppPane' !!
 * 
 *   1. for every div used by JQT as an app pane
 *   2. bind a function on the 'pageAnimationStart' event
 *   3. use angulars methods to find the element and it's scope for the 'div' that 
 *       the event was fired on
 *   4. if the direction is 'in', then modify a scope variable 'active' to true.
 *       (for 'out' it goes to false)
 *      Note: the routines detects if angular is in the apply phase 
 *            in which case the variable is modified directly
 */
// ready function 
$(document).ready(function(){

				$(".jqtAppPane").each(function(index, el){
					
					$(this).bind('pageAnimationStart', function(e, info){
											
										if(!!(info) && !!(info.direction))
										{
											var element = angular.element($(this));
											var scope = element.scope();
											
											if(info.direction == 'in')
											{
												if(! scope.$$phase ) {
													scope.$apply('active = true');
												}
												else {
													scope.active = true;
												}
											}
											else if(info.direction == 'out')
											{
												if(! scope.$$phase ) {
													scope.$apply('active = false');
												}
												else {
													scope.active = false;
												}
											}
										}
									} 
								)
				})	
				
				$('#jqt > .current:first').trigger('pageAnimationStart', {direction:'in'});
			// ready function 
			})
			
}
