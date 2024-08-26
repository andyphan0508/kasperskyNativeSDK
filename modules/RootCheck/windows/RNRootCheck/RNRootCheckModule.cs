using ReactNative.Bridge;
using System;
using System.Collections.Generic;
using Windows.ApplicationModel.Core;
using Windows.UI.Core;

namespace Root.Check.RNRootCheck
{
    /// <summary>
    /// A module that allows JS to share data.
    /// </summary>
    class RNRootCheckModule : NativeModuleBase
    {
        /// <summary>
        /// Instantiates the <see cref="RNRootCheckModule"/>.
        /// </summary>
        internal RNRootCheckModule()
        {

        }

        /// <summary>
        /// The name of the native module.
        /// </summary>
        public override string Name
        {
            get
            {
                return "RNRootCheck";
            }
        }
    }
}
