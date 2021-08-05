#!/bin/bash
#Stopping existing node servers
echo "Stopping any existing node servers"
{ # try

    echo "failed"
    pkill node

} || { # catch
    echo "failed "
}
